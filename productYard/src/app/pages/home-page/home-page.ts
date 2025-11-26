import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/header/header';
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, Header],
  templateUrl: './home-page.html',
})

export class HomePage {}

