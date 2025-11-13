import { ProductService } from './../../../core/product-service';
import { Component, signal, computed, inject, effect } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { ProductCards } from '../components/product-cards/product-cards';

@Component({
  selector: 'app-shop-page',
  imports: [Header, ProductCards],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.css',
})

export class ShopPage{
  private productService = inject(ProductService);
  products = computed(()=>this.productService.allProducts());
  isLoading = computed(()=>this.productService.isLoading());
  searchTerm = signal('');

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.products().filter(product => product.name.toLowerCase().includes(term))
  })

  updateSearchTerm(e: string) {
    this.searchTerm.set(e);
  }
} 
