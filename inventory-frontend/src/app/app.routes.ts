import { Routes } from '@angular/router';
import { LoginModule } from './features/auth/login/login-module';

export const routes: Routes = [
    { path: 'login', component: LoginModule },
    { path : '', redirectTo: 'login', pathMatch: 'full' },
];
