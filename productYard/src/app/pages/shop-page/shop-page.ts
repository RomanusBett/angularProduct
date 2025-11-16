import { ProductService } from '../../core/product-service';
import { Component, computed, inject } from '@angular/core';
import { ProductCards } from '../../components/product-cards/product-cards';

@Component({
  selector: 'app-shop-page',
  imports: [ ProductCards],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.css',
})

export class ShopPage{
  private prodServ = inject(ProductService);
  products = computed(()=>this.prodServ.allProducts());
  isLoading = computed(()=>this.prodServ.isLoading());
  filtered = computed(()=>this.prodServ.filteredProducts());
} 
