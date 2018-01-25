import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {
  error:boolean = true;

  constructor() {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
  }
}
