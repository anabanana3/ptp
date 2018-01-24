import { Component } from '@angular/core';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html'
})
export class ExpedienteComponent{

  error:boolean = true;
  
  constructor() {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
  }


}
