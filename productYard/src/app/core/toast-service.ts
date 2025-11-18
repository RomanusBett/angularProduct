import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number,
  message: string,
  type: 'success' | 'danger'
}

@Injectable({
  providedIn: 'root',
})

export class ToastService {
  toasts = signal<Toast[]>([]);
  private idCounter = 0;

  showToast(message: string, type: Toast['type'] = 'success') {    
    const id = this.idCounter++;
    this.toasts.update(old=>[
      ...old,
      {id, message, type}
    ]);
    setTimeout(() => {
      this.removeToast(id);
    }, 3000);
  }

  removeToast(id:number){
    this.toasts.update(old=>old.filter(t=>t.id!==id));
  }
}
