import { ProductService } from '../../core/product-service';
import { Component, computed, inject } from '@angular/core';
import { ProductCards } from '../../components/product-cards/product-cards';
import { YardCard } from '../../components/yard-card/yard-card';
import { YardInput } from '../../components/yard-input/yard-input';
import { RoundButton } from '../../components/round-button/round-button';

@Component({
  selector: 'app-shop-page',
  imports: [ ProductCards, YardCard, YardInput, RoundButton],
  templateUrl: './shop-page.html',
  styleUrl: './shop-page.css',
})

export class ShopPage{
  private prodServ = inject(ProductService);
  products = computed(()=>this.prodServ.allProducts());
  isLoading = computed(()=>this.prodServ.isLoading());
  filtered = computed(()=>this.prodServ.filteredProducts());

  showCreateModal:boolean = false;

  toggleCreateModal=()=>{
    this.showCreateModal = !this.showCreateModal;
  }
  closeCreateModal = ()=>{
    this.showCreateModal = false;
  }
} 
