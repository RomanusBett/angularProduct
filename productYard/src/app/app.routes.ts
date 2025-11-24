import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePage
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/shop-page/shop-page').then(c => c.ShopPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page').then(c => c.LoginPage)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register-page/register-page').then(c => c.RegisterPage)
    },
    {
        path: 'product/checkout',
        loadComponent: () => import('./pages/product-checkout/product-checkout').then(c => c.ProductCheckout)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFound
    }
];
