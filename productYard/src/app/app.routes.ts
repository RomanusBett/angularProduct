import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { NotFound } from './pages/not-found/not-found';
import { authGuard, adminRoleGuard } from './core/guards/auth-guard-guard';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePage
    },
    {
        path: 'admin/dashboard',
        loadComponent: () => import('./pages/admin-shop/shop-page').then(c => c.ShopPage),
        canActivate: [adminRoleGuard, authGuard]
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/customer-page/customer-page').then(c => c.CustomerPage),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page').then(c => c.LoginPage)
    }, 
    {
        path: 'register',
        loadComponent: () => import('./pages/register-page/register-page').then(c => c.RegisterPage),
    },
    {
        path: 'product/checkout',
        loadComponent: () => import('./pages/product-checkout/product-checkout').then(c => c.ProductCheckout),
        canActivate: [authGuard]
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
