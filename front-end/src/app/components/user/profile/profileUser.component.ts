import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AsociacionesService} from "../../../services/asociaciones.service";
import {ProfesionesService} from "../../../services/profesiones.service";
import { User } from "../../../interfaces/user.interface";

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
    Foto: ''
  };

  pass={
    newpass: '',
    repeatpass: ''
  }

  asociacion:string = '';
  profesion:string = '';
  error:boolean = true;
  profesiones:any[] = [];

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

  updateUser(){
    if(this.pass.newpass === ''){
      console.log(this.user);
      return;
    }
    console.log(this.user);
    console.log(this.pass);
  }
}
