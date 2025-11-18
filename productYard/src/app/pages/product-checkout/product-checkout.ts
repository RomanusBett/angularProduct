import { Component, inject, computed } from '@angular/core';
import { ProductService } from '../../core/product-service';
import { RoundButton } from '../../components/round-button/round-button';
import { YardCard } from '../../components/yard-card/yard-card';
import { RouterLink } from '@angular/router';
import { CardService } from '../../core/card-service';

@Component({
  selector: 'app-product-checkout',
  imports: [RoundButton, YardCard, RouterLink],
  templateUrl: './product-checkout.html',
  styleUrl: './product-checkout.scss',
})

export class ProductCheckout {
  private prodServ = inject(ProductService);
  cartServ = inject(CardService);
  itemsInCart = computed(()=>this.cartServ.cart());

  total = computed(()=>this.itemsInCart().reduce((acc, item)=> (acc + (item.price * item.quantity!)), 0));

  addItem(productid:number){
    this.cartServ.addToCard(productid);
  }
  decreaseItemQuantity(productId: number){
    this.cartServ.decreaseItemQuantity(productId);
  }
} 
