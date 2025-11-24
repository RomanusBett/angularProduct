import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { ProductService } from './core/services/product-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  private prodServ = inject(ProductService)
  inputSearch = computed(()=>this.prodServ.searchTerm());
  protected readonly title = signal('productYard');
}
