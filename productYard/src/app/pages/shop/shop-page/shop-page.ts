import { Component } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { ProductCards } from '../components/product-cards/product-cards';
import { yardProducts } from '../../../assets/data/products';

@Component({
  selector: 'app-shop-page',
  imports: [Header, ProductCards],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.css',
})
export class ShopPage {
  products = yardProducts
}
