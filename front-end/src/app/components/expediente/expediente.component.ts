import { Component } from '@angular/core';
import { ExpedientesService } from "../../services/expedientes.service";

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html'
})
export class ExpedienteComponent{

  error:boolean = true;
  bloque:number=1;


  constructor(private _expedienteService:ExpedientesService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

  }

terminar(){
  sessionStorage.removeItem('IDExp');

}

}
