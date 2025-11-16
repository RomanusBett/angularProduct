import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCheckout } from './product-checkout';

describe('ProductCheckout', () => {
  let component: ProductCheckout;
  let fixture: ComponentFixture<ProductCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCheckout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCheckout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
