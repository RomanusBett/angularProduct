import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { RouterLink, Router } from '@angular/router';
import { SessionService } from '../../core/services/session-service';
import { ToastService } from '../../core/services/toast-service';
import { InvalidFormMessage, danger, requestFailed } from '../../../assets/statusMessages/yardStatus';
import { USER_ROLES } from '../../components/product-cards/product-cards';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage {
  sessionServ = inject(SessionService);
  router = inject(Router);
  toastServ = inject(ToastService);

  isLoading = signal<boolean>(false);

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  private authServ = inject(AuthService);

  setSessionParameters(res:any) {
    this.sessionServ.setItem('token', res?.token);
    this.sessionServ.setItem('role', res?.roles[0]);
    this.sessionServ.setItem('username', res?.username);
  }

  handleUserLogin() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const loginCredentials = this.loginForm.value;

      this.authServ.loginUser(loginCredentials).subscribe({
        next: (res) => {
          this.setSessionParameters(res)
          this.isLoading.set(false);

          if (this.sessionServ.getItem('role') === USER_ROLES.role_admin) {
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