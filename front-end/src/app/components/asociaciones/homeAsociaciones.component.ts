import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AsociacionesService } from "../../services/asociaciones.service";
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
    Asociacion: '',
    Profesion: '',
    ID_Lugar: '',
    Direccion: '',
    Sexo: '',
    DNI: ''
  };

  tabla:number = 0;
  id:number = 0;
  loading:boolean = false;
  asociacion:string = '';

  constructor(private _userService:UserService, private _asociacionesService:AsociacionesService) {
    console.log(sessionStorage.getItem('iD'));
    this.id = parseInt(sessionStorage.getItem('iD'));

    this._asociacionesService.getAsociacion(this.id).subscribe(data=>{
      this.asociacion = data[0].Nombre;
      console.log(data[0].Nombre);
    })

    this._userService.getUsuarioSolicitantesAsociacion(this.id).subscribe(data =>{
      this.user = data;
      console.log(this.user);
    })
  }

  cancelUser(id){
    this._userService.deleteUsuario(id).subscribe(res => {
      if(res){ console.log(res);}
      else{ delete this.user[id];}
    })
  }

  activateUser(id, email){
    this._userService.activateUsuario(id, email).subscribe(res=>{
      console.log(res);
    })
  }

  cerrarSesion(){
    sessionStorage.removeItem('iD');
    sessionStorage.removeItem('token');
    location.href = '/principal'
  }

  view(number){
    if(number == 0){
      this._userService.getUsuarioSolicitantesAsociacion(this.id).subscribe(data=>{
        this.loading = false;
        this.tabla = 0
        this.user = data;
      })
      return;
    }

    if(number == 1){
      this._userService.getUsuarioRegistradosAsociacion(this.id).subscribe(data=>{
        this.loading = false;
        this.tabla = 1
        this.user = data;
      })
      return;
    }
  }
}
