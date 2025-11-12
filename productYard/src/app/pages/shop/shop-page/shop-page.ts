import { Component, OnInit } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { ProductCards } from '../components/product-cards/product-cards';
import { yardProducts } from '../../../assets/data/products';
import { signal } from '@angular/core';
import { ProductItems } from '../components/product-cards/product-cards';

@Component({
  selector: 'app-shop-page',
  imports: [Header, ProductCards],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.css',
})

export class ShopPage implements OnInit{
  isLoading = signal(true);
  products = signal<ProductItems[]>([]);

  ngOnInit(): void {
      setTimeout(()=>{
        this.products.set(yardProducts);
        this.isLoading.set(false);
      }, 2000)
  }
} 
