import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProductCheckout } from './product-checkout';
import { provideRouter } from '@angular/router';

describe('ProductCheckout', () => {
  let component: ProductCheckout;
  let fixture: ComponentFixture<ProductCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCheckout],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
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
