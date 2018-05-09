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
  admin:boolean = false;
  usuario:boolean = false;

  constructor(private _userService:UserService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }else if(sessionStorage.getItem('usuario') != null){
      this.usuario = true;
    }else{
      this.admin = true;
    }
  }

  ngAfterViewInit(){
    new iniciarMotor();
    //contador visitas
    let visita = {
      ID_Usuario: sessionStorage.iD
    }
    this._userService.visitasModelo3D(visita).subscribe(data=>{
    });
  }

  hola(){
    document.getElementById("tipo1").setAttribute("class", "animacion-flotante botones-flotantes-min");
    document.getElementById("tipo2").setAttribute("class", "animacion-flotante botones-flotantes-min");
    document.getElementById("tipo3").setAttribute("class", "animacion-flotante botones-flotantes-min");
    document.getElementById("tipo4").setAttribute("class", "animacion-flotante botones-flotantes-min");
  }

  adios(){
    document.getElementById("tipo1").setAttribute("class", "botones-flotantes-min");
    document.getElementById("tipo2").setAttribute("class", "botones-flotantes-min");
    document.getElementById("tipo3").setAttribute("class", "botones-flotantes-min");
    document.getElementById("tipo4").setAttribute("class", "botones-flotantes-min");
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
