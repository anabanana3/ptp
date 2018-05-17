import { Component, AfterViewInit } from '@angular/core';
import { UserService } from "../../services/user.service";
declare var iniciarMotor;
declare var mostrarTipo1;
declare var mostrarTipo2;
declare var mostrarTipo3;
declare var mostrarReal;
declare var mostrarCartoon;
declare var mostrarNoCartoon;
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
  nombre:string = "CARTOON";
  tipo = 0;

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
    document.getElementById('tipo' + this.tipo).setAttribute("class", "boton-flotante btn-activo");
  }

  tipo1(){
    document.getElementById('tipo' + this.tipo).setAttribute("class", "boton-flotante");
    this.tipo = 1;
    document.getElementById('tipo1').setAttribute("class", "boton-flotante btn-activo");
    new mostrarTipo1();
  }

  tipo2(){
    document.getElementById('tipo' + this.tipo).setAttribute("class", "boton-flotante");
    this.tipo = 2;
    document.getElementById('tipo2').setAttribute("class", "boton-flotante btn-activo");

    new mostrarTipo2();
  }

  tipo3(){
    document.getElementById('tipo' + this.tipo).setAttribute("class", "boton-flotante");
    this.tipo = 3;
    document.getElementById('tipo3').setAttribute("class", "boton-flotante btn-activo");

    new mostrarTipo3();
  }

  real(){
    document.getElementById('tipo' + this.tipo).setAttribute("class", "boton-flotante");
    this.tipo = 0;
    document.getElementById('tipo0').setAttribute("class", "boton-flotante btn-activo");

    new mostrarReal();
  }

  cartoon(){
    if(this.nombre === "CARTOON"){
      this.nombre = "NO CARTOON"
      new mostrarCartoon();
    }
    else{
      this.nombre = "CARTOON"
      new mostrarNoCartoon();
    }
  }

  // cambiaLuz(num){
  //   console.log(num);
  //   if(num == 1){
  //       document.getElementById("label-dir").setAttribute("class", "cambio-switch");
  //       document.getElementById("label-pos").setAttribute("class", "");
  //   }else{
  //     document.getElementById("label-pos").setAttribute("class", "cambio-switch");
  //     document.getElementById("label-dir").setAttribute("class", "");
  //   }
  // }
}
