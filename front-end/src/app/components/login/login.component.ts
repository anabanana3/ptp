import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';

import { AsociacionesService } from "../../services/asociaciones.service";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  json = {
    Email: '',
    Password: ''
  }

  check_asoc:boolean = false;
  mensaje:string = '';

  constructor(private activatedRoute:ActivatedRoute, private router:Router,
    private _asociacionesService:AsociacionesService, private _userService:UserService) { }

  login(forma:NgForm){

    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
    //valida el mail
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(!emailRegex.test(this.json.Email)){
      this.mensaje = 'Email no válido';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
    //console.log(this.json.Email);
    //console.log(this.json.Password);

    if(this.check_asoc){
      ////// ****** asociacion ****** //////
      this._asociacionesService.loginAsociacion(this.json)
        .subscribe(data =>{
          console.log(data);
          if (data.Resultado == "ERROR") {
            this.mensaje = 'Email o contraseña incorrectos';
            document.getElementById('alert').className = 'alert alert-danger';
            return;
          }
          //// sesion ////
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('iD', data.data[0].ID_Asocioacion);
          console.log(sessionStorage);
          location.href = '/asociaciones/homeAsociaciones.component';
        })

    }else{
      ////// ****** usuario ****** //////
      this._userService.loginUser(this.json)
        .subscribe(data =>{
          console.log(data);
          if (data.Resultado == "ERROR") {
            this.mensaje = 'Email o contraseña incorrectos';
            document.getElementById('alert').className = 'alert alert-danger';
            return;
          }
          //// sesion ////
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('iD', data.data[0].ID_Usuario);
          console.log(sessionStorage);
          location.href = '/home';
        })

    }
  }
}
