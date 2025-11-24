import { Component, inject } from '@angular/core';
import { input } from '@angular/core';
import { YardCard } from '../yard-card/yard-card';
import { RoundButton } from '../round-button/round-button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ToastService } from '../../core/services/toast-service';
import { ProductService } from '../../core/services/product-service';
import { CardService } from '../../core/services/card-service';

export interface ProductItems {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  discounted?: boolean;
  quantity?: number;
}
@Component({
  selector: 'app-product-cards',
  imports: [YardCard, RoundButton, ReactiveFormsModule],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.scss',
})
export class ProductCards {
  cartServ = inject(CardService);
  prodServ = inject(ProductService);
  productItems = input<ProductItems>();
  toastServ = inject(ToastService);
  showEditModal = false;

  editProductForm = new FormGroup({
    name: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    image: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    price: new FormControl('' ,{nonNullable:true, validators: [Validators.required]}),
    description: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
  });

  addToCart(productId:number){
    this.cartServ.addToCard(productId);
    this.toastServ.showToast('item added to cart', 'success');
  }

  removeFromCart(productId:number){
    this.cartServ.removeFromCart(productId);
    this.toastServ.showToast('item removed from cart', 'danger');
  }

  toggleEditModal=(product?: any)=>{
    if(product){
      this.editProductForm.patchValue({
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
      })
    }
    this.showEditModal = !this.showEditModal;
  }

  closeEditModal=()=>{
    this.showEditModal = false;
  }

  removeFromList(productId:number){    
    this.prodServ.removeItemFromList(productId);
    this.closeEditModal();
    this.toastServ.showToast('item has been deleted', 'danger');
  }

  editProduct(productId:number){
    let editFormValue = this.editProductForm.value;

    let updatedProduct = {
      id: productId,
      name: editFormValue.name!,
      price: Number(editFormValue.price)!,
      image: editFormValue.image!,
      description: editFormValue.description!
    } 
    this.prodServ.editProductDetails(updatedProduct);
    this.closeEditModal();
    this.toastServ.showToast('item edited successfuly', 'success');
  }
}
