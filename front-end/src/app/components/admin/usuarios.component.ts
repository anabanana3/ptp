import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../interfaces/user.interface";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent {

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

  loading:boolean = true;

  tabla:number = 0;
  /* tabla
    0: Solicitantes
    1: Registrados
    2: Cancelados
  */

  mensaje:string = '';
  error:boolean = true;
  constructor(private _userService:UserService){
    if(sessionStorage.getItem('iD') !== '44'){
      return;
    }
    this.error = false;

    this._userService.getSolicitantes(1, 3).subscribe(data=>{
      this.loading = false;
      this.user = data.Data;

      console.log(data);
    })
    return;
  }

  cancelUser(id){
    this._userService.deleteUsuario(id).subscribe(res => {
      if(res.warningCount == 0){
        this.mensaje = 'Usuario Cancelado!';
        location.href = '/admin/usuarios#arriba';
        document.getElementById('alert').className = 'alert alert-success';
        delete this.user[id];
        this.loading = true;
        this._userService.getSolicitantes(1, 3).subscribe(data=>{
          this.loading = false;
          this.user = data.Data;
        })
      }
      else{
        this.mensaje = 'Ha ocurrido un error!';
        location.href = '/admin/usuarios#arriba';
        document.getElementById('alert').className = 'alert alert-danger';
      }
    })
  }

  view(number){
    if(number == 0){
      this._userService.getSolicitantes(1, 3).subscribe(data=>{
        this.loading = false;
        console.log('Solicitantes');
        this.tabla = 0
        console.log(data);
        this.user = data.Data;
      })
      return;
    }

    if(number == 1){
      this._userService.getRegistrados(1, 3).subscribe(data=>{
        this.loading = false;
        this.tabla = 1
        console.log('Registrados');
        console.log(data.Data);
        this.user = data.Data;
      })
      return;
    }

    if(number == 2){
      this._userService.getCancelados(1, 3).subscribe(data=>{
        this.loading = false;
        this.tabla = 2
        console.log('Cancelados');
        console.log(data);
        this.user = data.Data;
      })
      return;
    }
  }
}
