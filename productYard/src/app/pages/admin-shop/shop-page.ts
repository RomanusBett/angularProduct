import { Component, computed, inject, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { ProductCards, ProductItems } from '../../components/product-cards/product-cards';
import { YardCard } from '../../components/yard-card/yard-card';
import { RoundButton } from '../../components/round-button/round-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../core/services/toast-service';
import { CallService } from '../../core/services/call-service';
import { take } from 'rxjs';
import { ProductService } from '../../core/services/product-service';
import { Header } from '../../shared/header/header';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session-service';
import { LogoutIcon } from '../../components/svg-icons/logout-icon/logout-icon';
import { USER_ROLES } from './../../components/product-cards/product-cards';
import { danger, failedToFetchDummy, productSuccessfullyCreated, success, InvalidFormMessage } from '../../../assets/statusMessages/yardStatus';

@Component({
  selector: 'app-shop-page',
  imports: [ProductCards, YardCard, RoundButton, ReactiveFormsModule, Header, LogoutIcon],
  templateUrl: './shop-page.html',
})

export class ShopPage implements OnInit {
  public prodServ = inject(ProductService);
  private callServ = inject(CallService);
  public toastServ = inject(ToastService);
  public sessionServ = inject(SessionService);
  public router = inject(Router);

  products = computed(() => this.prodServ.allProducts());
  isLoading = computed(() => this.prodServ.isLoading());
  filtered = computed(() => this.prodServ.filteredProducts());

  dummies = signal<ProductItems[]>([]);
  showCreateModal: boolean = false;
  errorMessage = "";
  userRoles = USER_ROLES;
  createProductStatus:string = "";

  ngOnInit(): void {
    this.fetchDummyJSON()
  }

  createProductForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    image: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  fetchDummyJSON() {
    this.callServ.fetchDummy().pipe(take(1)).subscribe({
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
      error: () => this.toastServ.showToast(failedToFetchDummy, danger),
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
      this.toastServ.showToast(productSuccessfullyCreated, success);
    } else {

      this.createProductStatus = InvalidFormMessage;
    }
  }

  toggleCreateModal = () => {
    this.showCreateModal = !this.showCreateModal;
  }

  closeCreateModal = () => {
    this.showCreateModal = false;
  }
} 