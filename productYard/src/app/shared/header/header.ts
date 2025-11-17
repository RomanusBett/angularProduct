import { Component, effect, inject } from '@angular/core';
import { signal } from '@angular/core';
import { ProductService } from '../../core/product-service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CardService } from '../../core/card-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
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
