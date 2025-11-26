import { Component, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { ProductService } from '../../core/services/product-service';

@Component({
  selector: 'app-not-found',
  imports: [Header],
  templateUrl: './not-found.html',
})
export class NotFound {
  public prodServ = inject(ProductService);
}
