import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    if (state.url === '' || state.url === '/') {
      return router.parseUrl('/dashboard');
    }
    return true;
  }

  return router.parseUrl('/login');
};
