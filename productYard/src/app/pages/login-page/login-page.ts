import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { RouterLink, Router } from '@angular/router';
import { timer } from 'rxjs';
import { SessionService } from '../../core/services/session-service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage{
  sessionServ = inject(SessionService);
  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  errorMessage = signal<string>('');

  setError(msg:string){
    this.errorMessage.set(msg)
    timer(3000).subscribe(()=>{
      this.errorMessage.set('');
    })
  };

  private authServ = inject(AuthService);

  handleUserLogin() {
    if (this.loginForm.valid) {
      const loginCredentials = this.loginForm.value;

      this.authServ.loginUser(loginCredentials).subscribe({
        next: (res) => { 
          this.sessionServ.setItem('token', res?.token);
          this.sessionServ.setItem('role', res?.roles[0]);
          this.sessionServ.setItem('username', res?.username);

          if(this.sessionServ.getItem('role')==="ROLE_ADMIN"){
            this.router.navigate(['/admin/dashboard'])
          } else {
            this.router.navigate(['/products'])
          }
        },
        error: (err) => {
          this.setError('Something went wrong')
        }
      })
    }
  }
}


