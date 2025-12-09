import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http:HttpClient){};

  registerUser(credentials:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/api/auth/signup`, credentials)
  }

  loginUser(credentials: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/auth/signin`, credentials)
  }

}