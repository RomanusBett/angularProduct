import { ProductService } from '../../core/product-service';
import { Component, computed, inject, signal } from '@angular/core';
import { ProductCards, ProductItems } from '../../components/product-cards/product-cards';
import { YardCard } from '../../components/yard-card/yard-card';
import { YardInput } from '../../components/yard-input/yard-input';
import { RoundButton } from '../../components/round-button/round-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../core/toast-service';
import { CallService } from '../../core/call-service';

@Component({
  selector: 'app-shop-page',
  imports: [ProductCards, YardCard, YardInput, RoundButton, ReactiveFormsModule],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.scss',
})

export class ShopPage {
  constructor(){
    this.fetchDummyData()
  }

  errorMessage = "";
  dummies = signal<ProductItems[]>([]);

  createProductForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    image: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  private prodServ = inject(ProductService);
  callServ = inject(CallService);
  toastServ = inject(ToastService);
  toasts = computed(() => this.toastServ.toasts())
  products = computed(() => this.prodServ.allProducts());
  isLoading = computed(() => this.prodServ.isLoading());
  filtered = computed(() => this.prodServ.filteredProducts());

  showCreateModal: boolean = false;

  toggleCreateModal = () => {
    this.showCreateModal = !this.showCreateModal;
  }
  closeCreateModal = () => {
    this.showCreateModal = false;
  }

  fetchDummyData() {
    this.callServ.fetchDummy().subscribe({
      next: (data) => {
        const productsArray = data.products;
        this.dummies.set(productsArray.map((item:any) => ({
          id: item.id,
          name: item.title ?? 'No Title',
          price: Number(item.price ?? 0),
          image: item.images?.[0] ?? '',
          description: item.description ?? '',
          discounted: true,
        }))  )       
      },
      error: (err) => console.error('Failed to fetch dummy data', err),
    });
  }

  logFormValue() {
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
    else {
      alert('All fields are required')
    }
  }
} 