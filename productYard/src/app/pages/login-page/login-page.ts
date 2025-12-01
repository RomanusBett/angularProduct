import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { RouterLink, Router } from '@angular/router';
import { SessionService } from '../../core/services/session-service';
import { ToastService } from '../../core/services/toast-service';
import { InvalidFormMessage, danger, requestFailed } from '../../../assets/statusMessages/yardStatus';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage{
  sessionServ = inject(SessionService);
  router = inject(Router);
  toastServ = inject(ToastService);

  isLoading  = signal<boolean>(false);

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  private authServ = inject(AuthService);

  handleUserLogin() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const loginCredentials = this.loginForm.value;

      this.authServ.loginUser(loginCredentials).subscribe({
        next: (res) => { 
          this.sessionServ.setItem('token', res?.token);
          this.sessionServ.setItem('role', res?.roles[0]);
          this.sessionServ.setItem('username', res?.username);
          this.isLoading.set(false);

          if(this.sessionServ.getItem('role')==="ROLE_ADMIN"){
            this.router.navigate(['/admin/dashboard'])
          } else {
            this.router.navigate(['/products'])
          }
        },
        error: () => {
          this.isLoading.set(false);
          this.toastServ.showToast(requestFailed, danger);          
        }
      })
    } else {
      this.toastServ.showToast(InvalidFormMessage, danger);
    }
  }
}