import { Component } from '@angular/core';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html'
})
export class ExpedienteComponent{

  error:boolean = true;
  bloque:number=1;

  constructor() {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
  }


}
