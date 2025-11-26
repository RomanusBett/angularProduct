import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { timer, delay, tap, of } from 'rxjs';
import { USER_ROLES } from '../../components/product-cards/product-cards';

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password  = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword){
      return null;
    }

    if(password.value !== confirmPassword.value){
      confirmPassword.setErrors({PasswordMismatch: true})
      return {passwordMismatch:true}
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.html',
  imports: [ReactiveFormsModule, RouterLink],
})

export class RegisterPage {
  private authServ = inject(AuthService);
  private router = inject(Router);

  registrationStatus = signal<string>('');

  userRole = USER_ROLES;
  options = [this.userRole.Admin, this.userRole.User];
  status: string = "";

  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.email, Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    role: new FormControl('', Validators.required)
  }, {validators: passwordMatchValidator()});

  setRegistrationStatus(msg:string){
    this.registrationStatus.set(msg);
    timer(2000).subscribe(()=>{
      this.registrationStatus.set('');
    })
  }

  handleUserRegister() {
    if (this.registerForm.valid) {
      const credentials = this.registerForm.value;

      const { confirmPassword, role, ...others } = credentials;

      const roleArray = [credentials.role]

      const dataToSend = {
        ...others,
        role: roleArray
      }

      this.authServ.registerUser(dataToSend).subscribe({
        next: (res) => {
          this.setRegistrationStatus('You have been successfully registered!')
          of(null).pipe(
            delay(2000), 
            tap(()=>this.router.navigate(['/login']))
          ).subscribe()
        },
        error: (error) => {
          this.setRegistrationStatus('Something went wrong!');
        }
      })
    } else {
      this.status = "Something went wrong";
    }
  }
}
