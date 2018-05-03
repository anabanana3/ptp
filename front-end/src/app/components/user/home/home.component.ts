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
  error:boolean = true;

  constructor(private _userService:UserService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
    this.id = parseInt(sessionStorage.getItem('iD'));

    this._userService.getUsuario(this.id).subscribe(data =>{
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.user = data[0];
      }
    });
  }

  logout(){
    sessionStorage.clear();
    location.href = '/login';
  }
}
