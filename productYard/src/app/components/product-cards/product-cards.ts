import { Component } from '@angular/core';
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
}
@Component({
  selector: 'app-product-cards',
  imports: [YardCard, RoundButton, YardInput],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.css',
})
export class ProductCards {
  productItems = input<ProductItems>();
  showEditModal = false;

  toggleEditModal=()=>{
    this.showEditModal = !this.showEditModal;
  }
  closeEditModal=()=>{
    this.showEditModal = false;
  }
}
