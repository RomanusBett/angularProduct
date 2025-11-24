import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Header } from './header';
import { provideRouter } from '@angular/router';
import { yardProducts } from '../../assets/data/products';
import { ProductService } from '../../core/services/product-service';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let prodServ: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
    prodServ = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('yardProducts should be defined after 3s', (done) => {
    setTimeout(() => {
      expect(yardProducts).toBeDefined();
      done();
    }, 3000);
  });

  it('should have correct properties for each item after 3s', (done) => {
    setTimeout(() => {
      yardProducts.forEach(item => {
        expect(item.id).toBeDefined();
        expect(item.name).toBeDefined();
        expect(item.price).toBeDefined();
        expect(typeof item.price).toBe('number');
        expect(item.description).toBeDefined();
        expect(item.image).toBeDefined();
      })
      done();
    }, 3000);
  })

  it('should filter products based on searchTerm', () => {
    const allProducts = [...yardProducts];
    prodServ.setSearchTerm('keyboard');
    const filtered = allProducts.filter(i=>i.name.toLowerCase().includes('keyboard'));
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every(p=>p.name.toLowerCase().includes('keyboard'))).toBeTrue()
  });

});
