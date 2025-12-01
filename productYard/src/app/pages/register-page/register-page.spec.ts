import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RegisterPage } from './register-page';
import { routes } from '../../app.routes';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { ToastService } from '../../core/services/toast-service';
import { InvalidFormMessage, danger, requestFailed, success, successRegistration } from '../../../assets/statusMessages/yardStatus';
import { of, throwError } from 'rxjs';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;

  const mockAuthService = {
    registerUser: jasmine.createSpy('registerUser')
  }

  const mockToastService = {
    showToast: jasmine.createSpy('showToast'),
    toasts: jasmine.createSpy('toasts')
  }

  const credentials = {
    username: 'john', 
    email: 'john@gmail.com',
    password: 'pass123',
    confirmPassword: 'pass123',
    role: 'user',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage], 
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(), 
        provideRouter(routes),
        {provide: AuthService, useValue: mockAuthService},
        {provide: ToastService, useValue: mockToastService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a toast on invalid register form submission', ()=>{
    component.registerForm.setValue({username: '', email: '', password: '', confirmPassword: '', role: ''});
    component.handleUserRegister();
    expect(mockToastService.showToast).toHaveBeenCalledWith(InvalidFormMessage, danger);
  });

  it('should call authService.registerUser upon valid form submission', ()=>{
    component.registerForm.setValue(credentials);
    mockAuthService.registerUser.and.returnValue(of({message: "User registered successfully!"}));
    component.handleUserRegister();
    const {confirmPassword, ...dataToSend} = credentials;
    expect(mockAuthService.registerUser).toHaveBeenCalledWith({...dataToSend, role:[dataToSend.role]});
    expect(component.isLoading()).toBeFalse();
  });

  it('should redirect to "/login" on successful registration', ()=>{
    component.registerForm.setValue(credentials);
    mockAuthService.registerUser.and.returnValue(of({message: "User registered successfully!"}));
    component.handleUserRegister();
    expect(mockToastService.showToast).toHaveBeenCalledWith(successRegistration, success)
    expect(router.navigate).toHaveBeenCalledWith(['/login'])
  });

  it('show an error upon registration failure', ()=>{
    component.registerForm.setValue(credentials);
    mockAuthService.registerUser.and.returnValue(throwError(()=>new Error()));
    component.handleUserRegister();
    expect(mockToastService.showToast).toHaveBeenCalledWith(requestFailed, danger);
    expect(component.isLoading()).toBeFalse();
  });

});
