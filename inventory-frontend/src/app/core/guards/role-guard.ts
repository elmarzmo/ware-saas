import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';
import { take, map } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route, state) => {
const auth = inject(Auth);
const router = inject(Router);

const expectedRole = route.data['role'];

return auth.userRole$.pipe(
  take(1),
  map(userRole => {

    if (expectedRole.includes(userRole)) {
      return true;
    }

return router.parseUrl('/dashboard');
  
  })
);
};
