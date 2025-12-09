import { Component, inject, computed } from '@angular/core';
import { RoundButton } from '../../components/round-button/round-button';
import { YardCard } from '../../components/yard-card/yard-card';
import { RouterLink } from '@angular/router';
import { CardService } from '../../core/services/card-service';
import { Header } from '../../shared/header/header';
import { from, reduce } from 'rxjs';


@Component({
  selector: 'app-product-checkout',
  imports: [RoundButton, YardCard, RouterLink, Header],
  templateUrl: './product-checkout.html',
  styleUrl: './product-checkout.scss',
})

export class ProductCheckout {
  cartServ = inject(CardService);
  itemsInCart = computed(()=>this.cartServ.cart());
  addTotal = (x:number, y:number) => x + y;

  total = computed(()=>this.itemsInCart().reduce((acc, item)=> (acc + (item.price * item.quantity!)), 0));

  addItem(productid:number){
    this.cartServ.addToCard(productid);
  }
  decreaseItemQuantity(productId: number){
    this.cartServ.decreaseItemQuantity(productId);
  }
} 
