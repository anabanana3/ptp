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

    this.json.ID_Usuario = id;
    console.log(id);
  }

  validate(forma:NgForm){
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return false;
    }

    this._userService.registrarSolicitante(this.json).subscribe(data=>{
      console.log(data);
      if(data){
        this.mensaje = 'Gracias por registrarte!';
        // location.href = '/login'
        document.getElementById('alert').className = 'alert alert-success';
        return;
      }
      this.mensaje = 'Campos Incorrectos';
      document.getElementById('alert').className = 'alert alert-danger';
    });
  }
}
