import { Component, AfterViewInit } from '@angular/core';
import { UserService } from "../../services/user.service";
declare var iniciarMotor;
declare var mostrarTipo1;
declare var mostrarTipo2;
declare var mostrarTipo3;
declare var mostrarReal;
declare var mostrarCartoon;
declare var borrarLuzCompleto;
declare var moverCamara;

@Component({
  selector: 'app-motor-grafico',
  templateUrl: './motor-grafico.component.html'
})
export class MotorGraficoComponent implements AfterViewInit {

  error:boolean = true;
  asociacion:boolean = false;

  constructor(private _userService:UserService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }

  }

  ngAfterViewInit(){
    new iniciarMotor();
    let visita = {
      ID_Usuario: sessionStorage.iD
    }
    this._userService.visitasModelo3D(visita).subscribe(data=>{
    });
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
