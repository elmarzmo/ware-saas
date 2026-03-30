import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
const auth = inject(Auth);
const router = inject(Router);

const expectedRole = route.data['role'];
const userRole = auth.getUserRole(); 

if (userRole !== expectedRole) {
  
  return true;
}
router.navigate(['/dashboard']);
  return false;
};
