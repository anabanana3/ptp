import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from "../../../services/user.service";
import {AsociacionesService} from "../../../services/asociaciones.service";
import {ProfesionesService} from "../../../services/profesiones.service";
import { User } from "../../../interfaces/user.interface";
import zxcvbn from "zxcvbn";

@Component({
  selector: 'app-profileUser',
  templateUrl: './profileUser.component.html'
})
export class ProfileUserComponent {

  id:number = -1;
  change:boolean = false;

  user:User ={
    Nombre:'',
    Apellidos: '',
    F_Nacimiento: '',
    Email: '',
    Asociacion: '',
    Profesion: '',
    ID_Lugar: '',
    Direccion: '',
    Sexo: '',
    DNI: '',
    Foto: '',
  };

  pass={
    newpass: '',
    repeatpass: ''
  }

  asociacion:string = '';
  profesion:string = '';
  error:boolean = true;
  profesiones:any[] = [];

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

  constructor(private _userService:UserService, private _asociacionesService:AsociacionesService,
              private _profesionesService:ProfesionesService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    this._profesionesService.getProfesiones().subscribe(data=>{
      console.log(data);
      this.profesiones = data;
    })
    this.id = parseInt(sessionStorage.getItem('iD'));

    this._userService.getUsuario(this.id).subscribe(data =>{
      this.user = data[0];
      this.user.Nombre = this.user.Nombre.split("'")[1];
      this.user.Email = this.user.Email.split("'")[1];
      this.user.Direccion = this.user.Direccion.split("'")[1];
      this.user.Asociacion = this.user.Asociacion.split("'")[1];
      this.user.Apellidos = this.user.Apellidos.split("'")[1];
      this.user.DNI = this.user.DNI.split("'")[1];
      console.log(this.user);
    })
  }

  save(forma:NgForm){
    console.log(forma);
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(!emailRegex.test(this.user.Email)){
      this.mensaje = 'Email mal introducido';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    console.log(this.user);

    // this._userService.updateUsuario().subscribe(data => {
    //   console.log(data);
    //   this.mensaje = 'Cambios registrados correctamente';
    //   document.getElementById('alert').className = 'alert alert-success';
    // })

    this.mensaje = 'ALGO MAL';
    document.getElementById('alert').className = 'alert alert-danger';

  }

  validate(pass){
    var score = JSON.stringify(zxcvbn(pass).score);
    document.getElementById("value").style.width = this.fuerza[score].width;
    document.getElementById("value").style.backgroundColor = this.fuerza[score].color;

    this.scorepass = score;
  }
}
