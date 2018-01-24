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

  updateUser(forma:NgForm){
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      location.href = '/user/profile#arriba';
      return false;
    }

    if(this.pass.newpass === ''){
      let usu ={
        Nombre: this.user.Nombre,
        Apellidos: this.user.Apellidos,
        F_Nacimiento: this.user.F_Nacimiento,
        Direccion: this.user.Direccion,
        ID_Lugar: this.user.ID_Lugar,
        Foto: this.user.Foto,
        Sexo: this.user.Sexo,
        ID_Profesion: this.user.Profesion
      }

      console.log(this.user);
      // this._userService.updateUsuario(usu, this.id).subscribe(data => {
      //
      // })
      return;
    }

    let usu ={
      Nombre: this.user.Nombre,
      Apellidos: this.user.Apellidos,
      F_Nacimiento: this.user.F_Nacimiento,
      Direccion: this.user.Direccion,
      ID_Lugar: this.user.ID_Lugar,
      Foto: this.user.Foto,
      Sexo: this.user.Sexo,
      ID_Profesion: this.user.Profesion,
      Password: this.pass.newpass
    }

    if(this.pass.newpass !== this.pass.repeatpass){
      this.mensaje = 'Las contraseñas introducidas no son iguales';
      document.getElementById('alert').className = 'alert alert-danger';
      location.href = '/user/profile#arriba';
      return;
    }

    if(parseInt(this.scorepass) < 2){
      this.mensaje = 'La contraseña es demasiado débil';
      document.getElementById('alert').className = 'alert alert-danger';
      location.href = '/user/profile#arriba';
      return;
    }

    // this._userService.updateRegistrado(usu, this.id).subscribe(data => {
    //
    // })

    console.log(this.user);
    console.log(this.pass);
  }

  validate(pass){
    var score = JSON.stringify(zxcvbn(pass).score);
    document.getElementById("value").style.width = this.fuerza[score].width;
    document.getElementById("value").style.backgroundColor = this.fuerza[score].color;

    this.scorepass = score;
  }
}
