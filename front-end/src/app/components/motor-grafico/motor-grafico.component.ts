import { Component, AfterViewInit } from '@angular/core';
declare var iniciarMotor;
declare var dibujarMotor;

@Component({
  selector: 'app-motor-grafico',
  templateUrl: './motor-grafico.component.html'
})
export class MotorGraficoComponent implements AfterViewInit {

  error:boolean = true;
  constructor() {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

  }

  ngAfterViewInit(){
    new iniciarMotor();
  }
}
