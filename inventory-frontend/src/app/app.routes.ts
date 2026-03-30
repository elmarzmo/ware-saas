import { Routes } from '@angular/router';
import {Login} from "./features/auth/login/login";
import {Dashboard} from "./features/dashboard/dashboard";
import {authGuard} from "./core/guards/auth-guard";
import {Layout} from "./core/layout/layout";
import { Products } from './features/products/products';
import { Stock } from './features/stock/stock';
import { Analytics } from './features/analytics/analytics';
import { Alerts } from './features/alerts/alerts';
import { Users } from './features/users/users';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: Layout, canActivate: [authGuard], children: [
        { path: 'dashboard', component: Dashboard },
        { path: 'products', component: Products },
        { path: 'stock', component: Stock },
        { path: 'analytics', component: Analytics },
        { path: 'alerts', component: Alerts },
        { path: 'users', component: Users },

    ]},
    { path: 'users', component: Users, canActivate: [authGuard, roleGuard], data: { role: 'admin' } },
    { path : '', redirectTo: 'login', pathMatch: 'full' },
];
