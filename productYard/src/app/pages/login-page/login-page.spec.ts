import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { LoginPage } from './login-page';
import { routes } from '../../app.routes';
import { ToastService } from '../../core/services/toast-service';
import { AuthService } from '../../core/services/auth-service';
import { of, throwError } from 'rxjs';
import { SessionService } from '../../core/services/session-service';
import { danger, requestFailed, InvalidFormMessage } from '../../../assets/statusMessages/yardStatus';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router:Router;

  const mockToastService = {
    showToast: jasmine.createSpy('showToast'),
    toasts: jasmine.createSpy('toasts')
  };

  const mockAuthService = {
    loginUser: jasmine.createSpy('loginUser')
  };

  const mockSessionService = {
    setItem: jasmine.createSpy('setItem'),
    getItem: jasmine.createSpy('getItem'),
    clearSession: jasmine.createSpy('clearSession')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter(routes), 
        {provide: ToastService, useValue: mockToastService},
        {provide: AuthService, useValue: mockAuthService},
        {provide: SessionService, useValue: mockSessionService},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    spyOn(router, 'navigate')
    fixture.detectChanges();
  });
  
  const credentials = {username:'John', password: '123456'};

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a toast if form is invalid', ()=>{
    component.loginForm.setValue({username: '', password:''});
    component.handleUserLogin();

    expect(mockToastService.showToast).toHaveBeenCalledWith(
      InvalidFormMessage, 
      danger
    )
  });

  it('should call authService.loginUser when the form is valid and submitted', ()=>{
    component.loginForm.setValue(credentials);
    mockAuthService.loginUser.and.returnValue(of({token: 'abc', roles:['ROLE_USER'], username: 'John'}));

    component.handleUserLogin();

    expect(mockAuthService.loginUser).toHaveBeenCalledWith(credentials);
    expect(component.isLoading()).toBeFalse();
  });

  it('should store session values on successful login', ()=>{
    component.loginForm.setValue(credentials);
    mockAuthService.loginUser.and.returnValue(of({token:'abc', username: 'John', roles: ['ROLE_ADMIN']}));
    mockSessionService.getItem.and.returnValue(of({token:'abc', username:'John', role:'admin'}));

    component.handleUserLogin();

    expect(mockSessionService.setItem).toHaveBeenCalledWith('role', 'ROLE_ADMIN');
    expect(mockSessionService.setItem).toHaveBeenCalledWith('username', 'John')
    expect(mockSessionService.setItem).toHaveBeenCalledWith('token', 'abc')
  });

  it('should redirect successfully logged in admin to "/admin/dashboard"', ()=>{
    component.loginForm.setValue(credentials);
    mockAuthService.loginUser.and.returnValue(of({token:'abc', username: 'John', roles: ['ROLE_ADMIN']}));
    mockSessionService.getItem.and.returnValue('ROLE_ADMIN');

    component.handleUserLogin();
    
    expect(router.navigate).toHaveBeenCalledWith(['/admin/dashboard'])
  })

  it('should redirect to "/products" page for non admin users', ()=>{
    component.loginForm.setValue(credentials);
    mockAuthService.loginUser.and.returnValue(of({token:'abc', username: 'John', roles: ['ROLE_USER']}));
    mockSessionService.getItem.and.returnValue('ROLE_USER');

    component.handleUserLogin();

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should throw an error on unsucessful login', ()=>{
    component.loginForm.setValue(credentials);
    mockAuthService.loginUser.and.returnValue(throwError(()=> new Error()));

    component.handleUserLogin();

    expect(mockToastService.showToast).toHaveBeenCalledWith(requestFailed, danger);
    expect(component.isLoading()).toBeFalse();
  })
});
