import { Component, computed, inject, signal, effect } from '@angular/core';
import { ProductCards } from '../../components/product-cards/product-cards';
import { ToastService } from '../../core/services/toast-service';
import { ProductService } from '../../core/services/product-service';
import { Header } from '../../shared/header/header';
import { SessionService } from '../../core/services/session-service';
import { CardService } from '../../core/services/card-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-page',
  imports: [ProductCards, Header, RouterLink],
  templateUrl: './customer-page.html',
})
export class CustomerPage {
  public prodServ = inject(ProductService);
  public toastServ = inject(ToastService);
  private sessionServ = inject(SessionService);
  public cardServ = inject(CardService);
  private router = inject(Router);

  userSearch = signal('');
  wiggleCart = signal(false);
  toasts = computed(() => this.toastServ.toasts())
  products = computed(() => this.prodServ.allProducts());
  isLoading = computed(() => this.prodServ.isLoading());
  filtered = computed(() => this.prodServ.filteredProducts());

  errorMessage = "";
  private intervalId: any;

  logoutUser(){
    this.sessionServ.clearSession();
    this.router.navigate(['/login']);
  }

  constructor(){
    effect(()=>{
      this.prodServ.setSearchTerm(this.userSearch())
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
