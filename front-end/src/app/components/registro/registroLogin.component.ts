import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-registroLogin',
  templateUrl: './registroLogin.component.html'
})

export class RegistroLoginComponent {

  json ={
    ID_Usuario: '',
    Email: '',
    Password: ''
  }

  mensaje:string = '';

  constructor(private _userService:UserService){
    let id = location.href.split('?')[1];

    let m = id.substring(0, id.length - 1);

    this.json.ID_Usuario = m;
  }

  validate(forma:NgForm){
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return false;
    }

    this._userService.registrarSolicitante(this.json).subscribe(data=>{
      console.log(data);
      if(data.Resultado === 'OK'){
        this.mensaje = 'Enhorabuena, Ya puedes Iniciar Sesión!';
        document.getElementById('alert').className = 'alert alert-success';
      }
      else{
        this.mensaje = 'Ha ocurrido un error!';
        document.getElementById('alert').className = 'alert alert-danger';
      }
    });
  }
}
