import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCards } from './product-cards';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ProductCards', () => {
  let component: ProductCards;
  let fixture: ComponentFixture<ProductCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCards], 
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
