import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../services/user.service";
import zxcvbn from "zxcvbn";

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
  repeatpass:string = '';
  scorepass:string = '';

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

  constructor(private _userService:UserService){
    let id = location.href.split('?')[1];

    let m = id.substring(0, id.length - 1);

    this.json.ID_Usuario = m;
  }

  newUser(forma:NgForm){
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return false;
    }
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


    if(!emailRegex.test(this.json.Email)){
      this.mensaje = 'Email mal introducido';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    if(this.json.Password !== this.repeatpass){
      this.mensaje = 'Las contraseñas introducidas no son iguales';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    if(parseInt(this.scorepass) < 2){
      this.mensaje = 'La contraseña es demasiado débil';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
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

  validate(pass){
    var score = JSON.stringify(zxcvbn(pass).score);
    document.getElementById("value").style.width = this.fuerza[score].width;
    document.getElementById("value").style.backgroundColor = this.fuerza[score].color;

    this.scorepass = score;
  }
}
