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

    this._userService.login(this.json).subscribe(data =>{
      console.log(data);
      console.log(data.data);
      console.log(data.token);
      console.log(data.tipo);
      if(data.Codigo == 450){
        this.mensaje = 'Email o contraseña incorrectos';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }else{
        sessionStorage.setItem('token', data.token);
        console.log(data.tipo);
        let datos = JSON.parse(data.data);
        sessionStorage.setItem('Nombre', datos[0].Nombre);
        switch (data.tipo){
          case 1:
            //Admin
          sessionStorage.setItem('iD', datos[0].ID_Usuario);
          location.href = '/admin';
          break;
          case 2:
            //Asociacion
            sessionStorage.setItem('iD', datos[0].ID_Asociacion);
            sessionStorage.setItem('asociacion', 'true');
            location.href = '/asociacion';
          break;
          case 3:
            //Usuario
            sessionStorage.setItem('iD', datos[0].ID_Usuario);
            location.href = '/home';
          break;
        }
      }
    });
  }
}
