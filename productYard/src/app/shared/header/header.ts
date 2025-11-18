import { Component, effect, inject, signal } from '@angular/core';
import { ProductService } from '../../core/product-service';
import { RouterLink, Router } from '@angular/router';
import { CardService } from '../../core/card-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  userSearch = signal('')

  private productService = inject(ProductService);
  cardServ = inject(CardService)
  router = inject(Router);

  menuOpen = false;

  toggleMenuOpen(){
    this.menuOpen = !this.menuOpen;
  }

  constructor(){
    effect(()=>{
      this.productService.setSearchTerm(this.userSearch())
    })
  }
}
