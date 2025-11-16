import { Component, effect, inject, output } from '@angular/core';
import { signal } from '@angular/core';
import { ProductService } from '../../core/product-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userSearch = signal('')

  private productService = inject(ProductService);

  constructor(){
    effect(()=>{
      this.productService.setSearchTerm(this.userSearch())
    })
  }
}
