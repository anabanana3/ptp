import { Component } from '@angular/core';

@Component({
  selector: 'app-motor-grafico',
  templateUrl: './motor-grafico.component.html'
})
export class MotorGraficoComponent {

  error:boolean = true;
  constructor() {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
  }

}
