import { Component, effect, output } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  searchedField = output<string>();
  userSearch = signal('')

  constructor(){
    effect(()=>{
      this.searchedField.emit(this.userSearch())      
    })
  }
}
