import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShopPage } from './pages/shop/shop-page/shop-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShopPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('productYard');
}
