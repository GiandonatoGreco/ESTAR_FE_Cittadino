import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.userIsLogged()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('homepage');
};

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.userIsLogged()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/auth');
};

export const adminGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.userIsAdmin()) {
    return true;
  }

  return router.parseUrl('/dashboard');
};
