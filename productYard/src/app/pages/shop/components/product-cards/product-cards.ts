import { Component } from '@angular/core';
import { input } from '@angular/core';

export interface ProductItems {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
@Component({
  selector: 'app-product-cards',
  imports: [],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.css',
})
export class ProductCards {
  productItems = input<ProductItems>();
}
