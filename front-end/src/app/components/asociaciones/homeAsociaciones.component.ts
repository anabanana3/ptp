import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../interfaces/user.interface";

@Component({
  selector: 'app-homeAsociaciones',
  templateUrl: './homeAsociaciones.component.html'
})
export class HomeAsociaciones{
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
    DNI: ''
  };

  id:number = 5;
  loading:boolean = false;
  asociacion:string = '';

  constructor(private _userService:UserService) {
    this._userService.getUsuarioAsociacion(this.id).subscribe(data =>{
      this.user = data;

      this.asociacion = this.user[0].Asociacion;
    })
  }

  cancelUser(id){
    this._userService.deleteUsuario(id).subscribe(res => {
      if(res){ console.log(res);}
      else{ delete this.user[id];}
    })
  }
}
