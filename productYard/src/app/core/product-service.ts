import { ProductItems } from './../pages/shop/components/product-cards/product-cards';
import { computed, Injectable } from '@angular/core';
import { yardProducts } from '../assets/data/products';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  allProducts = signal<ProductItems[]>([]);
  isLoading = signal(true);
  searchTerm = signal('');

  filteredProducts = computed(()=>{
    const term = this.searchTerm().toLowerCase();
    return this.allProducts().filter(product=>product.name.toLowerCase().includes(term))
  })

  constructor() {
    this.loadProducts();  
  }

  loadProducts = ()=>{
    setTimeout(() => {
      this.allProducts.set(yardProducts);
      this.isLoading.set(false);      
    }, 2000);
  }

  setSearchTerm(e:string){
    this.searchTerm.set(e);
  }
}
