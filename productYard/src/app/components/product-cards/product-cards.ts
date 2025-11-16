import { Component } from '@angular/core';
import { input } from '@angular/core';
import { YardCard } from '../yard-card/yard-card';

export interface ProductItems {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
@Component({
  selector: 'app-product-cards',
  imports: [YardCard],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.css',
})
export class ProductCards {
  productItems = input<ProductItems>();
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
  closeModal(){
    this.showModal = false;
  }

}
