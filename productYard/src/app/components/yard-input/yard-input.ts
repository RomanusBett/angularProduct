import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-yard-input',
  imports: [ReactiveFormsModule],
  templateUrl: './yard-input.html',
  styleUrl: './yard-input.css',
})
export class YardInput {
  inputId = input<string>();
  inputPlaceholder = input<string| number>();
  inputType = input<string>();
  inputLabel = input<string>();
  formCtrl = input<FormControl>();
} 
