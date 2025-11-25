import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private platformId = inject(PLATFORM_ID);
  yardSignalToken = signal<string | null>('');

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(key, value)
      this.yardSignalToken.set(value);
    }
  }

  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  clearSession(){
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
      this.yardSignalToken.set('');
    }
  }
}
