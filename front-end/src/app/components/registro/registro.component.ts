import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../../interfaces/user.interface";
import zxcvbn from "zxcvbn";

import { ProfesionesService } from "../../services/profesiones.service";
import { AsociacionesService } from "../../services/asociaciones.service";
import { UserService } from "../../services/user.service";
import { Asociacion } from "../../interfaces/asociacion.interface";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent {

  usuario:User={
    Nombre:'',
    Apellidos: '',
    F_Nacimiento: '',
    Email: '',
    ID_Asociacion: 0,
    ID_Profesion: 0,
    ID_Lugar: '',
    Direccion: '',
    Sexo: '',
    DNI: ''
  }

  asociacion:Asociacion ={
    Nombre:'',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: ''
  }

  fuerza = {
    0:{
      color: '',
      width: '0'
    },
    1:{
      color: 'red',
      width: '25%'
    },
    2:{
      color: 'orange',
      width: '50%'
    },
    3:{
      color: 'yellow',
      width: '75%'
    },
    4:{
      color: 'green',
      width: '100%'
    }
  }


  id:string;
  profesiones:any[] = [];
  asociaciones:any[] = [];

  usuarios:boolean = true;

  mensaje:string = '';

  constructor(private _profesionesService:ProfesionesService, private _asociacionesService:AsociacionesService,
    private router:Router, private _userService:UserService, private activatedRoute:ActivatedRoute) {

    this._profesionesService.getProfesiones().subscribe(data=>{
      console.log(data);
      this.profesiones = data;
    })

    this._asociacionesService.getAsociaciones().subscribe(data=>{
      console.log(data);
      this.asociaciones = data;
    })
  }

  new(bool){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(!bool){
      if(!emailRegex.test(this.asociacion.Email)){
        this.mensaje = 'Email mal introducido';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }

      this._asociacionesService.newAsociacion(this.asociacion).subscribe(data=>{
        console.log(data);
        if(data.warningCount == 0){
          this.mensaje = 'Gracias por registrarte!';
          document.getElementById('alert').className = 'alert alert-success';
        }
      }, error=>{
        this.mensaje = 'Campos Incompletos';
        document.getElementById('alert').className = 'alert alert-danger';
        console.log(error);
      });
    }
    else{
      if(!emailRegex.test(this.usuario.Email)){
        this.mensaje = 'Email mal introducido';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }

      this.usuario.Direccion = this.usuario.ID_Lugar;
      this._userService.newUsuario(this.usuario).subscribe(data=>{
        console.log(data);
        if(data.warningCount == 0){
          this.mensaje = 'Gracias por registrarte!';
          document.getElementById('alert').className = 'alert alert-success';
        }
      }, error=>{
        this.mensaje = 'Campos Incompletos';
        document.getElementById('alert').className = 'alert alert-danger';
        console.log(error);
      });
    }
  }

  validate(pass){
    var score = JSON.stringify(zxcvbn(pass).score);
    document.getElementById("value").style.width = this.fuerza[score].width;
    document.getElementById("value").style.backgroundColor = this.fuerza[score].color;
  }
}
