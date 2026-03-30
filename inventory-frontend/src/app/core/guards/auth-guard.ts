import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';

export const authGuard: CanActivateFn =() => {

  const router = Inject(Router);
  const token = localStorage.getItem('token');
  

  if (token) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
export const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.role;
};
