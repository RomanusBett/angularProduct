import { ProductService } from '../../core/product-service';
import { Component, computed, inject } from '@angular/core';
import { ProductCards } from '../../components/product-cards/product-cards';
import { YardCard } from '../../components/yard-card/yard-card';
import { YardInput } from '../../components/yard-input/yard-input';
import { RoundButton } from '../../components/round-button/round-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-shop-page',
  imports: [ProductCards, YardCard, YardInput, RoundButton, ReactiveFormsModule],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.css',
})

export class ShopPage {
  errorMessage = "";

  createProductForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    image: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  private prodServ = inject(ProductService);
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
    }
    else{
      alert('All fields are required')
    }
  }
} 