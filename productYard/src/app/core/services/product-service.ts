import { computed, Injectable, DestroyRef, inject } from '@angular/core';
import { signal } from '@angular/core';
import { yardProducts } from '../../../assets/data/products';
import { ProductItems } from '../../components/product-cards/product-cards';
import { timer, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private destroyRef = inject(DestroyRef);

  allProducts = signal<ProductItems[]>([]);
  isLoading = signal(true);
  searchTerm = signal('');
  hamburgerOpen = false;

  filteredProducts = computed(()=>{
    const term = this.searchTerm().toLowerCase();
    this.allProducts().sort((a,b)=>b.id-a.id);
    return this.allProducts().filter(product=>product.name.toLowerCase().includes(term))
  })

  constructor() {
    this.loadProducts();  
  }

  toggleHamburger() {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  loadProducts = ()=>{
    timer(2000).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(()=>{
      this.allProducts.set(yardProducts);
      this.isLoading.set(false);
    })).subscribe();
  }

  addProduct(product: ProductItems){
    this.allProducts.update(items=>[...items, product])
  }

  setSearchTerm(e:string){
    this.searchTerm.set(e);
  }

  editProductDetails(updated: ProductItems){
    this.allProducts.update(items=>items.map(item=>item.id===updated.id ? {...item, ...updated}: item))
  }

  removeItemFromList(productId: number){
    this.allProducts.update(items=>items.filter(item=>item.id !== productId))
  }
}
