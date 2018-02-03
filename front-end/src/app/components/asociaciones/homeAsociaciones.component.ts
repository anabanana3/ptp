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
  mensaje:string = '';
  error:boolean = true;

  constructor(private _userService:UserService, private _asociacionesService:AsociacionesService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
    this.id = parseInt(sessionStorage.getItem('iD'));

    this._asociacionesService.getAsociacion(this.id).subscribe(data=>{
      console.log(data);
      this.asociacion = data[0].Nombre.split("'")[1];
    })

    this._userService.getUsuarioSolicitantesAsociacion(this.id, 1, 3).subscribe(data => {
      console.log(data);
      this.user = data.Data;
      console.log(this.user);
    })
  }

  cancelUser(id){
    this._userService.deleteUsuario(id).subscribe(res => {
      if(res.warningCount == 0){
        this.mensaje = 'Usuario Cancelado!';
        location.href = '/asociacion#arriba';
        document.getElementById('alert').className = 'alert alert-success';
        delete this.user[id];
        this.loading = true;
        this._userService.getSolicitantes(1, 3).subscribe(data=>{
          this.loading = false;
          this.user = data;
        })
      }
      else{
        this.mensaje = 'Ha ocurrido un error!';
        location.href = '/asociacion#arriba';
        document.getElementById('alert').className = 'alert alert-danger';
      }
    })
  }

  activateUser(id, email){
    this._userService.activateUsuario(id, email).subscribe(res=>{
      console.log(res);
      if(res.Resultado === 'OK'){
        this.loading = true;
        this.mensaje = 'Usuario validado Correctamente!';
        location.href = '/asociacion#arriba';
        document.getElementById('alert').className = 'alert alert-success';

        if(this.tabla === 0){
          this._userService.getUsuarioSolicitantesAsociacion(this.id, 1, 3).subscribe(data =>{
            this.user = data;
            this.loading = false;
          })
          return;
        }
        if(this.tabla === 1){
          this._userService.getUsuarioRegistradosAsociacion(this.id, 1, 3).subscribe(data=>{
            this.loading = false;
            this.user = data;
          })
          return;
        }
      }
      else{
        this.mensaje = 'HA ocurrido un error!';
        location.href = '/asociacion#arriba';
        document.getElementById('alert').className = 'alert alert-danger';
      }
    })
  }

  cerrarSesion(){
    sessionStorage.removeItem('iD');
    sessionStorage.removeItem('token');
    location.href = '/principal'
  }

  view(number){
    if(number == 0){
      this._userService.getUsuarioSolicitantesAsociacion(this.id, 1, 3).subscribe(data=>{
        console.log(data);
        this.loading = false;
        this.tabla = 0
        this.user = data;
      })
      return;
    }

    if(number == 1){
      this._userService.getUsuarioRegistradosAsociacion(this.id, 1, 3).subscribe(data=>{
        console.log(data);
        this.loading = false;
        this.tabla = 1
        this.user = data;
      })
      return;
    }
  }
}
