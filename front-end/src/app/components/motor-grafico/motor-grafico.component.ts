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
declare var mostrarAnimacion;

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

  sinMGF:string = "SIN MGF";
  tipo_1:string = "TIPO 1";
  tipo_2:string = "TIPO 2";
  tipo_3:string = "TIPO 3";

  constructor(private _userService:UserService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }else if(sessionStorage.getItem('usuario') != null){
      this.usuario = true;
    }else if(sessionStorage.getItem('admin') != null){
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

  click(tipo){
    if(tipo == "SIN MGF" && this.sinMGF !== tipo) {
      if(this.tipo_1 === "SIN MGF") this.tipo_1 = this.sinMGF;
      if(this.tipo_2 === "SIN MGF") this.tipo_2 = this.sinMGF;
      if(this.tipo_3 === "SIN MGF") this.tipo_3 = this.sinMGF;
      this.sinMGF = tipo;
      new mostrarReal();
    }

    if(tipo == "TIPO 1" && this.sinMGF !== tipo)  {
      this.tipo_1 = this.sinMGF;
      this.sinMGF = tipo;
      new mostrarTipo1();
    }

    if(tipo == "TIPO 2" && this.sinMGF !== tipo)  {
      this.tipo_2 = this.sinMGF;
      this.sinMGF = tipo;
      new mostrarTipo2();
    }

    if(tipo == "TIPO 3" && this.sinMGF !== tipo)  {
      this.tipo_3 = this.sinMGF;
      this.sinMGF = tipo;
      new mostrarTipo3();
    }
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

  animacion(){
    new mostrarAnimacion();
  }
}
