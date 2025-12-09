import { Component, inject } from '@angular/core';
import { input } from '@angular/core';
import { YardCard } from '../yard-card/yard-card';
import { RoundButton } from '../round-button/round-button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ToastService } from '../../core/services/toast-service';
import { ProductService } from '../../core/services/product-service';
import { CardService } from '../../core/services/card-service';
import { EditIcon } from '../svg-icons/edit-icon/edit-icon';
import { itemEdited, itemAdded, itemRemoved, itemDeleted, success, danger } from '../../../assets/statusMessages/yardStatus';

export interface ProductItems {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stockedOut?: boolean;
  quantity?: number;
}

export enum USER_ROLES{
    Admin = 'admin',
    User = 'user', 
    role_admin = "ROLE_ADMIN"
  } 

@Component({
  selector: 'app-product-cards',
  imports: [YardCard, RoundButton, ReactiveFormsModule, EditIcon],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.scss',
})
export class ProductCards {
  cartServ = inject(CardService);
  prodServ = inject(ProductService);
  toastServ = inject(ToastService);

  productItems = input<ProductItems>();
  role = input<string>()

  showEditModal = false;  
  userRoles = USER_ROLES;

  editProductForm = new FormGroup({
    name: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    image: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    price: new FormControl('' ,{nonNullable:true, validators: [Validators.required]}),
    description: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
  });

  addToCart(productId:number){
    this.cartServ.addToCard(productId);
    this.toastServ.showToast(itemAdded, success);
  }

  removeFromCart(productId:number){
    this.cartServ.removeFromCart(productId);
    this.toastServ.showToast(itemRemoved, danger);
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
    this.toastServ.showToast(itemDeleted, danger);
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
    this.toastServ.showToast(itemEdited, success);
  }
}
