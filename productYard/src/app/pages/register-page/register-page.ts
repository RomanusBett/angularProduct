import { ToastService } from './../../core/services/toast-service';
import { AuthService } from '../../core/services/auth-service';
import { USER_ROLES } from '../../components/product-cards/product-cards';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { delay, tap, of } from 'rxjs';
import { InvalidFormMessage, requestFailed, danger, successRegistration, success } from '../../../assets/statusMessages/yardStatus';


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
  toastServ = inject(ToastService);

  isLoading = signal<boolean>(false);

  userRole = USER_ROLES;
  options = [this.userRole.Admin, this.userRole.User];

  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.email, Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    role: new FormControl('', Validators.required)
  }, {validators: passwordMatchValidator()});


  handleUserRegister() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      const credentials = this.registerForm.value;

      const { confirmPassword, role, ...others } = credentials;

      const roleArray = [credentials.role];

      const dataToSend = {
        ...others,
        role: roleArray
      }

      this.authServ.registerUser(dataToSend).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toastServ.showToast(successRegistration, success)
          this.router.navigate(['/login'])
        },
        error: () => {
          this.isLoading.set(false)
          this.toastServ.showToast(requestFailed, danger);
        }
      })
    } else {
      this.toastServ.showToast(InvalidFormMessage, danger);
    }
  }
}
