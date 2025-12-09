import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProductService } from './product-service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle hamburger menu', ()=>{
    expect(service.hamburgerOpen).toBeFalse();
    service.toggleHamburger();
    expect(service.hamburgerOpen).toBeTrue();
  });

});
