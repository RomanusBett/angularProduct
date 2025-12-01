import { Component, computed, inject, signal, effect, DestroyRef } from '@angular/core';
import { ProductCards } from '../../components/product-cards/product-cards';
import { ToastService } from '../../core/services/toast-service';
import { ProductService } from '../../core/services/product-service';
import { Header } from '../../shared/header/header';
import { SessionService } from '../../core/services/session-service';
import { CardService } from '../../core/services/card-service';
import { Router, RouterLink } from '@angular/router';
import { interval, of, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartIcon } from '../../components/svg-icons/cart-icon/cart-icon';
import { LogoutIcon } from '../../components/svg-icons/logout-icon/logout-icon';

@Component({
  selector: 'app-customer-page',
  imports: [ProductCards, Header, RouterLink, CartIcon, LogoutIcon],
  templateUrl: './customer-page.html',
})
export class CustomerPage {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private sessionServ = inject(SessionService);
  public prodServ = inject(ProductService);
  public toastServ = inject(ToastService);
  public cardServ = inject(CardService);

  userSearch: string = "";
  wiggleCart = signal(false);
  products = computed(() => this.prodServ.allProducts());
  isLoading = computed(() => this.prodServ.isLoading());
  filtered = computed(() => this.prodServ.filteredProducts());

  errorMessage = "";

  logoutUser() {
    this.sessionServ.clearSession();
    this.router.navigate(['/login']);
  }

  constructor() {
    interval(3000).pipe(
      switchMap(() => {
        if (this.cardServ.cart().length > 0) {
          this.wiggleCart.set(true);
          return of(null).pipe(switchMap(() => timer(500)))
        };
        return of(null);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.wiggleCart.set(false))
  }
}
