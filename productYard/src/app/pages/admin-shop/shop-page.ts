import { Component, computed, inject, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { ProductCards, ProductItems } from '../../components/product-cards/product-cards';
import { YardCard } from '../../components/yard-card/yard-card';
import { RoundButton } from '../../components/round-button/round-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../core/services/toast-service';
import { CallService } from '../../core/services/call-service';
import { Subscription, take } from 'rxjs';
import { ProductService } from '../../core/services/product-service';
import { Header } from '../../shared/header/header';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session-service';


@Component({
  selector: 'app-shop-page',
  imports: [ProductCards, YardCard, RoundButton, ReactiveFormsModule, Header],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.scss',
})

export class ShopPage implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.fetchDummyJSON()
  }

  public prodServ = inject(ProductService);
  private dummyDataSubscription: Subscription | undefined;
  private callServ = inject(CallService);
  private toastServ = inject(ToastService);
  public sessionServ = inject(SessionService);
  public router = inject(Router);

  toasts = computed(() => this.toastServ.toasts())
  products = computed(() => this.prodServ.allProducts());
  isLoading = computed(() => this.prodServ.isLoading());
  filtered = computed(() => this.prodServ.filteredProducts());

  errorMessage = "";
  dummies = signal<ProductItems[]>([]);
  showCreateModal: boolean = false;

  createProductForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    image: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  fetchDummyJSON() {
    this.dummyDataSubscription = this.callServ.fetchDummy().pipe(take(1)).subscribe({
      next: (data) => {
        const productsArray = data.products;
        this.dummies.set(productsArray.map((item: any) => ({
          id: item.id,
          name: item.title ?? 'No Title',
          price: Number(item.price ?? 0),
          image: item.images?.[0] ?? '',
          description: item.description ?? '',
          stockedOut: true,
        })))
      },
      error: (err) => console.error('Failed to fetch dummy data', err),
    });
  }

  logoutUser() {
    this.sessionServ.clearSession();
    this.router.navigate(['/login']);
  }

  createNewProduct() {
    if (this.createProductForm.valid) {
      let yardFormValue = this.createProductForm.value;

      let newProduct = {
        id: this.products().length + 2,
        name: yardFormValue.name!,
        price: Number(yardFormValue.price)!,
        description: yardFormValue.description!,
        image: yardFormValue.image!
      }
      this.prodServ.addProduct(newProduct);
      this.createProductForm.reset();
      this.closeCreateModal();
      this.toastServ.showToast('product successfully created', 'success');
    }
  }

  toggleCreateModal = () => {
    this.showCreateModal = !this.showCreateModal;
  }

  closeCreateModal = () => {
    this.showCreateModal = false;
  }

  ngOnDestroy(): void {
    if (this.dummyDataSubscription) {
      this.dummyDataSubscription.unsubscribe()
    }
  }
} 