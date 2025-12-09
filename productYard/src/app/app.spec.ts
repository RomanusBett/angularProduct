import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { HomePage } from './pages/home-page/home-page';
import { NotFound } from './pages/not-found/not-found';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the /home route mapped to the HomePage', () => {
    const homeRoutes = routes.find(r => r.path === 'home');
    expect(homeRoutes?.component).toBe(HomePage);
  })

  it('should have products page lazy loaded', () => {
    const productRoute = routes.find(r => r.path === 'products');
    expect(typeof productRoute?.loadComponent).toBe('function');
  })

  it('should have the /product/checkout route mapped to the ProductCheckout component', () => {
    const checkoutRoute = routes.find(r => r.path === 'product/checkout');
    expect(typeof checkoutRoute?.loadComponent).toBe('function');
  })

  it('should have the wildcard route mapped to the notFound component', () => {
    const wildCardRoute = routes.find(r => r.path === '**');
    expect(wildCardRoute?.component).toBe(NotFound);
  })

  it('should have the empty url redirect to the hom page', ()=>{
    const redirect = routes.find(r=>r.path === '');
    expect(redirect?.redirectTo).toBe('home')
  })

});
