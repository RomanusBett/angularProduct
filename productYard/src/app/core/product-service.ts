import { ProductItems } from '../components/product-cards/product-cards';
import { computed, Injectable } from '@angular/core';
import { yardProducts } from '../assets/data/products';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  allProducts = signal<ProductItems[]>([]);
  isLoading = signal(true);
  searchTerm = signal('');

  filteredProducts = computed(()=>{
    const term = this.searchTerm().toLowerCase();
    this.allProducts().sort((a,b)=>b.id-a.id);
    return this.allProducts().filter(product=>product.name.toLowerCase().includes(term))
  })

  constructor() {
    this.loadProducts();  
  }

  loadProducts = ()=>{
    setTimeout(() => {
      this.allProducts.set(yardProducts);
      this.isLoading.set(false);      
    }, 2000);
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
