import { Component, effect, inject, output } from '@angular/core';
import { signal } from '@angular/core';
import { ProductService } from '../../../../core/product-service';

@Component({
  selector: 'app-header',
  imports: [],
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
