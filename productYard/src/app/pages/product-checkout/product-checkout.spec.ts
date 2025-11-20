import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProductCheckout } from './product-checkout';

describe('ProductCheckout', () => {
  let component: ProductCheckout;
  let fixture: ComponentFixture<ProductCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCheckout],
      providers: [provideZonelessChangeDetection()]
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
