import { ProductItems } from './../../components/product-cards/product-cards';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal, computed } from '@angular/core';
import { ProductCheckout } from './product-checkout';
import { provideRouter } from '@angular/router';
import { CardService } from '../../core/services/card-service';
import { ProductService } from '../../core/services/product-service';

describe('ProductCheckout', () => {
  let component: ProductCheckout;
  let fixture: ComponentFixture<ProductCheckout>;
  let service: CardService
  
  const mockProducts: ProductItems[] = [
    { id: 1, name: 'Product A', price: 10, description:'r', image:'t', quantity: 0 },
    { id: 2, name: 'Product B', price: 5, description:'a', image:'y',  quantity: 0 },
  ];

  const mockProductService = {
    allProducts: jasmine.createSpy('allProducts').and.returnValue(mockProducts)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCheckout],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCheckout);
    component = fixture.componentInstance;
    service = TestBed.inject(CardService);
    fixture.detectChanges();
  });

  afterEach(() => {
    service.cart.set([]); 
    mockProductService.allProducts.calls.reset();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty cart', ()=>{
    expect(service.cart()).toEqual([]);
  })

  it('should add an item to cart if not already present', ()=>{
    service.addToCard(1);
    const cartItems = service.cart();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].quantity).toBe(1);
  })

  it('should increase the quantity of an item if already in cart', ()=>{
    service.addToCard(1);
    service.addToCard(1);
    const cartItems = service.cart();
    expect(cartItems[0].quantity).toBe(2);
  })

  it('should not add a product to cart if id does not exist in allProducts', ()=>{
    service.addToCard(999);
    expect(service.cart()).toEqual([])
  })

  it('should remove an item from cart if quantity is equal to 0', ()=>{
    service.addToCard(1);
    service.removeFromCart(1);
    expect(service.cart()).toEqual([]);
  })
  
  it('should correct compute the total price', ()=>{
    service.addToCard(1);
    service.addToCard(1);
    service.addToCard(2);

    const total = service.cart().reduce((acc, item)=> acc + (item.price * (item.quantity ?? 0)), 0);
    expect(total).toBe(25)
  })
});
