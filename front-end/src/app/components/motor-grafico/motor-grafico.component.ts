import { Component, AfterViewInit } from '@angular/core';
declare var iniciarMotor;
declare var mostrarTipo1;
declare var mostrarTipo2;
declare var mostrarTipo3;
declare var mostrarReal;
declare var mostrarCartoon;

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

  tipo1(){
    new mostrarTipo1();
  }

  tipo2(){
    new mostrarTipo2();
  }

  tipo3(){
    new mostrarTipo3();
  }

  real(){
    new mostrarReal();
  }

  cartoon(){
    new mostrarCartoon();
  }
}
