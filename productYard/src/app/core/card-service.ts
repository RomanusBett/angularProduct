import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductService } from './product-service';
import { ProductItems } from '../components/product-cards/product-cards';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cartProducts = inject(ProductService);

  cart = signal<ProductItems[]>([]);
  allProducts = computed(()=>this.cartProducts.allProducts());

  addToCard=(productId:number)=>{    
    const product = this.allProducts().find(p=>p.id===productId);
    
    if (!product)return;
    
    const existingItem = this.cart().find(c => c.id === productId);

    if(existingItem){
      this.cart.update(items=>items.map(item=>item.id === productId ? {...item, quantity: (item.quantity ?? 0) + 1}:item))
    } else {
      this.cart.update(items=> [
        ...items, 
        {...product, quantity:1}
      ]);
    }
  }

  productInCart(productId:number){
    const productPresent = this.cart().find(c => c.id === productId);
    return productPresent;
  }

  decreaseItemQuantity(productId:number){
    this.cart.update(items=>items.map(item=>item.id===productId ? {...item, quantity: (item.quantity??0)-1}: item).filter(item=>item.quantity!>0))
  }

  removeFromCart(productId:number){
    this.cart.update(items=>items.filter(item=>item.id !== productId));
  }

}
