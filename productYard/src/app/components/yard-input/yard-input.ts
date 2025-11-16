import { Component, input } from '@angular/core';

@Component({
  selector: 'app-yard-input',
  imports: [],
  templateUrl: './yard-input.html',
  styleUrl: './yard-input.css',
})
export class YardInput {
  inputId = input<string>();
  inputPlaceholder = input<string| number>();
  inputType = input<string>();
  inputLabel = input<string>();
} 
