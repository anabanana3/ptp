import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import { User } from "../../../interfaces/user.interface";

@Component({
  selector: 'app-profileUser',
  templateUrl: './profileUser.component.html'
})
export class ProfileUserComponent {

  id:number = 21;

  change:boolean = false;

  user:User ={
    Nombre:'',
    Apellidos: '',
    F_Nacimiento: '',
    Email: '',
    ID_Asociacion: 0,
    ID_Profesion: 0,
    ID_Lugar: '',
    Direccion: '',
    Sexo: '',
    DNI: '',
    Foto: ''
  };

  constructor(private _userService:UserService) {
    this._userService.getUsuario(this.id).subscribe(data =>{
      this.user = data[0];
      console.log(this.user.Foto);
    })
  }

}
