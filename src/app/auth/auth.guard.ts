import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { routes } from '../../utils/routes';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.userIsLogged()) {
    return true;
  }

  // Redirect to the dashboard page
  return router.parseUrl(routes.dashboard.path);
};

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.userIsLogged()) {
    return true;
  }

  // Redirect to the landing page
  return router.parseUrl(routes.landing.path);
};
