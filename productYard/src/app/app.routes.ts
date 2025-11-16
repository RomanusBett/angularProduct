import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { NotFound } from './pages/not-found/not-found';
import { ShopPage } from './pages/shop-page/shop-page';
import { ProductCheckout } from './pages/product-checkout/product-checkout';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePage
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ShopPage
    },
    {
        path: 'product/checkout',
        component: ProductCheckout
    },
    {
        path: '**',
        component: NotFound
    }
];
