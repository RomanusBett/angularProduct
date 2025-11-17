import { CardService } from './../../core/card-service';
import { ProductService } from '../../core/product-service';
import { Component, inject } from '@angular/core';
import { input } from '@angular/core';
import { YardCard } from '../yard-card/yard-card';
import { RoundButton } from '../round-button/round-button';
import { YardInput } from '../yard-input/yard-input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

export interface ProductItems {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity?: number;
}
@Component({
  selector: 'app-product-cards',
  imports: [YardCard, RoundButton, YardInput, ReactiveFormsModule],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.css',
})
export class ProductCards {

  cartServ = inject(CardService);
  prodServ = inject(ProductService);
  productItems = input<ProductItems>();
  showEditModal = false;

  editProductForm = new FormGroup({
    name: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    image: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    price: new FormControl('' ,{nonNullable:true, validators: [Validators.required]}),
    description: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
  });

  addToCart(productId:number){
    this.cartServ.addToCard(productId)
  }

  removeFromCart(productId:number){
    this.cartServ.removeFromCart(productId);
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
  }
}
