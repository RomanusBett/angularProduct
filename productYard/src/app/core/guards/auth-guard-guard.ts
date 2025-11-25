import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from '../services/session-service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const sessionServ = inject(SessionService);
  const router = inject(Router);
  const token = sessionServ.getItem('token');  
  
  if (!token) {    
    router.navigate(['/login'])
    return false;
  }
  return true;
};

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }
  const router = inject(Router);
  const sessionServ = inject(SessionService);
  const role = sessionServ.getItem('role');  
  
  if (role === 'ROLE_ADMIN') {
    return true;
  } else{
    router.navigate(['/products'])
    return false;
  }
  
};