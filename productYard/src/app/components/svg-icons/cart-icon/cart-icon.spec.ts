import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CartIcon } from './cart-icon';

describe('CartIcon', () => {
  let component: CartIcon;
  let fixture: ComponentFixture<CartIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartIcon],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
