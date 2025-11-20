import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiUrl = 'https://dummyjson.com/products?limit=3&skip=3';

  private http = inject(HttpClient);

  fetchDummy(): Observable<any>{
    return this.http.get(`${this.apiUrl}`)
  }
  
}
