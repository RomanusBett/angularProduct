import { Component, input } from '@angular/core';


@Component({
  selector: 'app-round-button',
  imports: [],
  templateUrl: './round-button.html',
  styleUrl: './round-button.css',
})
export class RoundButton {
  roundBtnText = input<string>();
  alertType = input<string|number>();
}
