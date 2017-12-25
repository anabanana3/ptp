import { Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { UserService } from "../../../services/user.service";
import { User } from "../../../interfaces/user.interface";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  id:number = -1;

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

  // user:string = "";

  constructor(private _userService:UserService) {
    console.log(sessionStorage.getItem('iD'));
    this.id = parseInt(sessionStorage.getItem('iD'));

    this._userService.getUsuario(this.id).subscribe(data =>{
      this.user = data;
      console.log("Aqui data user");
      console.log(this.user);
    })
  }

  logout(){
    sessionStorage.clear();
    location.href = '/login';
  }
}
