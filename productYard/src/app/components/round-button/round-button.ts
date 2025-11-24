import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-round-button',
  imports: [],
  templateUrl: './round-button.html',
  styleUrl: './round-button.scss',
})
export class RoundButton {
  roundBtnText = input<string | number>();
  alertType = input<string>();
  buttonClicked = output();

  onClick(){
    this.buttonClicked.emit();
  }
}
