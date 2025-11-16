import { Component, inject, computed } from '@angular/core';
import { ProductService } from '../../core/product-service';
import { RoundButton } from '../../components/round-button/round-button';
import { YardCard } from '../../components/yard-card/yard-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-checkout',
  imports: [RoundButton, YardCard, RouterLink],
  templateUrl: './product-checkout.html',
  styleUrl: './product-checkout.css',
})
export class ProductCheckout {
  private prodServ = inject(ProductService);
  cartedProducts = computed(()=>this.prodServ.allProducts().slice(0,2));
} 
