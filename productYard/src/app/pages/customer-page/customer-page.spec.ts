import { SessionService } from './../../core/services/session-service';
import { provideRouter, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CustomerPage } from './customer-page';
import { routes } from '../../app.routes';

describe('CustomerPage', () => {
  let component: CustomerPage;
  let fixture: ComponentFixture<CustomerPage>;
  let router: Router;

  const mockSessionService = {
    setItem: jasmine.createSpy('setItem'),
    getItem: jasmine.createSpy('getItem'),
    clearSession: jasmine.createSpy('clearSession')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPage],
      providers: [
        provideZonelessChangeDetection(), 
        provideRouter(routes),
        {provide: SessionService, useValue: mockSessionService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerPage);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate')
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clear session values on user logout', ()=>{
    component.logoutUser();
    expect(mockSessionService.clearSession).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  })
});
