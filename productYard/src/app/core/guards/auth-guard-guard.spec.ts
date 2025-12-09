import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { adminRoleGuard, authGuard } from './auth-guard-guard';
import { SessionService } from '../services/session-service';
import { provideZonelessChangeDetection } from '@angular/core';


const mockSessionService = {
  getItem: jasmine.createSpy('getItem'),
  setItem: jasmine.createSpy('setItem')
}

let router: Router;

describe('authGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: SessionService, useValue: mockSessionService }
      ]
    });
    mockSessionService.getItem.calls.reset();
    mockSessionService.setItem.calls.reset();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  const runGuard = () => {
    return TestBed.runInInjectionContext(() => authGuard({} as any, {} as any))
  }

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('auth guard should return true if a token is present', () => {
    mockSessionService.getItem.and.returnValue('token');
    expect(runGuard()).toBeTrue();
  })

  it('auth guard should redirect to "/login" true if a token is missing', () => {
    mockSessionService.getItem.and.returnValue('');
    expect(runGuard()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/login']);
  })

});


describe('adminRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: SessionService, useValue: mockSessionService }
      ]
    });
    mockSessionService.getItem.calls.reset();
    mockSessionService.setItem.calls.reset();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  const runGuard = () => {
    return TestBed.runInInjectionContext(() => adminRoleGuard({} as any, {} as any))
  }

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('admin guard should return true if a admin token is present', () => {
    mockSessionService.getItem.and.returnValue('ROLE_ADMIN');
    expect(runGuard()).toBeTrue();
  })

  it('auth guard should redirect to "/login" true if a token is missing', () => {
    mockSessionService.getItem.and.returnValue('ROLE_USER');
    expect(runGuard()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/products']);
  })
});