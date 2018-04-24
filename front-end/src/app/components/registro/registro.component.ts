import { Component, ElementRef, AfterViewInit } from '@angular/core';
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
    F_Nacimiento: '', /*TODO BORRAR*/
    Email: '',
    ID_Asociacion: 0,
    ID_Profesion: 0,
    ID_Lugar: '',
    Direccion: '',
    Sexo: '',   /*TODO BORRAR*/
    DNI: '',
    Captcha: null
  }

  asociacion:Asociacion ={
    Nombre:'',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: '',
    Captcha: null
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
  repeatpass:string = '';
  scorepass:string = '';

  captcha;

  constructor(private _profesionesService:ProfesionesService, private _asociacionesService:AsociacionesService,
    private router:Router, private _userService:UserService, private activatedRoute:ActivatedRoute, private element:ElementRef) {

    this._profesionesService.getProfesiones().subscribe(data=>{
      this.profesiones = data;
    })

    this._asociacionesService.getAsociacionesValidadas().subscribe(data=>{
      this.asociaciones = data;
    })
  }


  new(forma:NgForm, bool){
    if(forma.valid === false){
      location.href = '/registro#arriba'
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    //obtengo el valor del captcha
    let captcha = this.element.nativeElement.querySelector('#g-recaptcha-response').value;

    if(!bool){
      //ASOCIACION
      this.asociacion.Captcha = captcha;
      if(!emailRegex.test(this.asociacion.Email)){
        location.href = '/registro#arriba';
        this.mensaje = 'Email mal introducido';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }

      if(this.asociacion.Password !== this.repeatpass){
        location.href = '/registro#arriba';
        this.mensaje = 'Las contraseñas introducidas no son iguales';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }

      if(parseInt(this.scorepass) < 2){
        location.href = '/registro#arriba';
        this.mensaje = 'La contraseña es demasiado débil';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }
      console.log(this.asociacion);
      this._asociacionesService.newAsociacion(this.asociacion).subscribe(data=>{
        console.log('data');
        console.log(data);
        if(data.warningCount == 0){
          this.mensaje = 'Gracias por registrarse! Recibirá un email cuando la asociación sea aceptada.';
          document.getElementById('alert').className = 'alert alert-success';
        }
      }, error=>{
        this.mensaje = 'Campos Incompletos';
        document.getElementById('alert').className = 'alert alert-danger';
        console.log(error);
      });
    }
    else{
      //USUARIO
      this.usuario.Captcha = captcha;
      if(!emailRegex.test(this.usuario.Email)){
        this.mensaje = 'Email mal introducido';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }

      this.usuario.Direccion = this.usuario.ID_Lugar;
      console.log(this.usuario);
      this._userService.newUsuario(this.usuario).subscribe(data=>{
        if(data.warningCount == 0){
          this.mensaje = 'Gracias por registrarse! Recibirá un email cuando sea aceptado por su asociación';
          location.href = '/registro#arriba';
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

    this.scorepass = score;
  }

}
