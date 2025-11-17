import { CardService } from './../../core/card-service';
import { Component, inject, OnInit } from '@angular/core';
import { input } from '@angular/core';
import { YardCard } from '../yard-card/yard-card';
import { RoundButton } from '../round-button/round-button';
import { YardInput } from '../yard-input/yard-input';

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
  imports: [YardCard, RoundButton, YardInput],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.css',
})
export class ProductCards {

  cartServ = inject(CardService);
  productItems = input<ProductItems>();
  showEditModal = false;

  addToCart(productId:number){
    this.cartServ.addToCard(productId)
  }

  removeFromCart(productId:number){
    this.cartServ.removeFromCart(productId);
  }

  toggleEditModal=()=>{
    this.showEditModal = !this.showEditModal;
  }

  closeEditModal=()=>{
    this.showEditModal = false;
  }
}
