import { Component, effect, inject, signal, OnDestroy } from '@angular/core';
import { ProductService } from '../../core/product-service';
import { RouterLink, Router } from '@angular/router';
import { CardService } from '../../core/card-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnDestroy {
  userSearch = signal('');
  wiggleCart = signal(false);

  private productService = inject(ProductService);
  private intervalId:any;
  cardServ = inject(CardService)
  router = inject(Router);

  menuOpen = false;

  toggleMenuOpen(){
    this.menuOpen = !this.menuOpen;
  }

  constructor(){
    effect(()=>{
      this.productService.setSearchTerm(this.userSearch())
    });

    this.intervalId = setInterval(()=>{
      if(this.cardServ.cart().length>0){
        this.wiggleCart.set(true);
      }
      setTimeout(() => {
        this.wiggleCart.set(false);
      }, 500);
    },3000)
  }

  ngOnDestroy(): void {
      clearInterval(this.intervalId);
  }
  
}
