import { Component } from '@angular/core';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html'
})
export class RecursosComponent {

  error:boolean = true;
  constructor() {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
  }

}
