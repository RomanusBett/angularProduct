import { Component,signal, computed } from '@angular/core';
import { Header } from '../../../shared/header/header';
import { ProductCards } from '../components/product-cards/product-cards';
import { yardProducts } from '../../../assets/data/products';
import { ProductItems } from '../components/product-cards/product-cards';

@Component({
  selector: 'app-shop-page',
  imports: [Header, ProductCards],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.css',
})

export class ShopPage{
  isLoading = signal(true);
  products = signal<ProductItems[]>([]);
  searchTerm = signal('');

  filteredProducts = computed(()=>{
    const term = this.searchTerm().toLowerCase();
    return this.products().filter(product=>product.name.toLowerCase().includes(term))
  })

  constructor (){
    setTimeout(()=>{
      this.products.set(yardProducts);
      this.isLoading.set(false);
    }, 2000)
  }

  updateSearchTerm(e:string){        
    this.searchTerm.set(e);    
  }
} 
