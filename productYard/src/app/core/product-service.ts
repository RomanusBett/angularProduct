import { ProductItems } from './../pages/shop/components/product-cards/product-cards';
import { Injectable } from '@angular/core';
import { yardProducts } from '../assets/data/products';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  allProducts = signal<ProductItems[]>([]);
  isLoading = signal(true);

  constructor() {
    this.loadProducts();  
  }

  loadProducts = ()=>{
    setTimeout(() => {
      this.allProducts.set(yardProducts);
      this.isLoading.set(false);      
    }, 2000);
  }
}
