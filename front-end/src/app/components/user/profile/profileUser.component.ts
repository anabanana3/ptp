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

  asociacion:string = '';
  profesion:string = '';

  constructor(private _userService:UserService, private _asociacionesService:AsociacionesService,
              private _profesionesService:ProfesionesService) {

    console.log(sessionStorage.getItem('iD'));
    this.id = parseInt(sessionStorage.getItem('iD'));

    this._userService.getUsuario(this.id).subscribe(data =>{
      this.user = data[0];
      this.user.Nombre = this.user.Nombre.split("'")[1];
      this.user.Email = this.user.Email.split("'")[1];
      this.user.Direccion = this.user.Direccion.split("'")[1];
      this.user.Apellidos = this.user.Apellidos.split("'")[1];
      this.user.DNI = this.user.DNI.split("'")[1];
      console.log(this.user);
    })
  }

}
