import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth-service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideZonelessChangeDetection(), 
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', ()=>{
    const mockCredentials = {email: 'name@gmail.com', password: 'name12'}
    const mockResponse = {token:'abc', username: 'John', roles: ['ROLE_ADMIN']}

    service.loginUser(mockCredentials).subscribe(response=>
      expect(response).toEqual(mockResponse)
    )
    const req = httpMock.expectOne(`${apiUrl}/api/auth/signin`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);
    req.flush(mockResponse);
  });

  it('should register a user', ()=>{
    const mockCredentials = {username: 'John', email: 'john@gmai;.com' ,password: 'john12'};
    const mockResponse = {message:'user registered successfully'};

    service.registerUser(mockCredentials).subscribe(response=>
      expect(response).toEqual(mockResponse)
    )

    const req = httpMock.expectOne(`${apiUrl}/api/auth/signup`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCredentials);
    req.flush(mockResponse);
  })
});