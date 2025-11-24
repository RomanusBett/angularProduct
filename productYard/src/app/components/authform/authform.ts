import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-authform',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './authform.html',
  styleUrl: './authform.scss',
})

export class Authform implements OnInit {
  private authServ = inject(AuthService);
  usernameMissing: string = "";
  emailMissing: string = "";
  passwordMissing: string = "";
  passwordMismatch: string = "";
  passwordLengthError: string = "";
  emailInvalid: string = "";
  formStatus: string = "";


  ngOnInit(): void {
    this.registerForm.get('username')?.valueChanges.subscribe(() => this.usernameMissing = "");
    this.registerForm.get('email')?.valueChanges.subscribe(() => this.emailMissing = "");
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.passwordMissing = "";
      this.passwordLengthError = ""
    });
    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => { this.passwordMismatch = "" })
  };

  options =['admin', 'user']

  router = inject(Router);

  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.email, Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    role: new FormControl('', Validators.required) 
  });


  loginForm = new FormGroup({
    username: new FormControl('', {nonNullable:true, validators:[Validators.required]}),
    password: new FormControl('', {nonNullable:true, validators:[Validators.required]})
  })

  handleUserRegister() {
    if (this.registerForm.valid) {
      const credentials = this.registerForm.value;
      
      if (credentials.password !== credentials.confirmPassword) {
        this.passwordMismatch = "Passwords do not match";
        return;
      }

      const { confirmPassword, role, ...others } = credentials;

      const roleArray = [credentials.role]

      const dataToSend = {
        ...others, 
        role: roleArray
      }
      
      this.authServ.registerUser(dataToSend).subscribe({
        next: (res)=>{
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.username);
          localStorage.setItem('user_role', res.role)
        },
        error: (error)=>{
          console.error(error)
        }
      })

    } else {
      const registerValues = this.registerForm.value;

      if (!registerValues.username) {
        this.usernameMissing = "Username is required!"
        return;
      }

      if (!registerValues.email) {
        this.emailMissing = "Email is required!"
        return;
      }

      if (!registerValues.password) {
        this.passwordMissing = "Password is required!"
        return;
      }

      if (registerValues.password.length < 6) {
        this.passwordLengthError = "Password should be atleast 6 characters long!"
        return;
      }

      if(registerValues.password !== registerValues.confirmPassword){
        this.passwordMismatch = "passwords do not match"
      }
      this.formStatus = "form invalid"
    }
  }

  handleUserLogin(){

    if(this.loginForm.valid){

      const loginCredentials = this.loginForm.value;
      console.log(loginCredentials);
      
      this.authServ.loginUser(loginCredentials).subscribe({
        next: (res)=>{
          console.log(res)
        },
        error: (err)=>{
          console.error(err)
        }
      })

    } else{

      const loginCredentials = this.loginForm.value;

      if (!loginCredentials.username) {
        this.usernameMissing = "Username is required!"
        return;
      }

      if (!loginCredentials.password) {
        this.passwordMissing = "Password is required!"
        return;
      }
    }
  }
}