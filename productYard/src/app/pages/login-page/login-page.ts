import { Component } from '@angular/core';
import { Authform } from '../../components/authform/authform';

@Component({
  selector: 'app-login-page',
  imports: [Authform],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

}
