import { Routes } from '@angular/router';
import {Login} from "./features/auth/login/login";
import {Dashboard} from "./features/dashboard/dashboard";
import {authGuard} from "./core/guards/auth-guard";
import {Layout} from "./core/layout/layout";
import { Products } from './features/products/products';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: Layout, canActivate: [authGuard], children: [
        { path: 'dashboard', component: Dashboard },
        { path: 'products', component: Products }
    ]},
    { path : '', redirectTo: 'login', pathMatch: 'full' },
];
