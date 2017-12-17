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

  constructor(private _userService:UserService){
    this._userService.getSolicitantes().subscribe(data=>{
      this.loading = false;
      console.log('Solicitantes');
      console.log(data);
      this.user = data;
    })
    return;
  }

  cancelUser(id){
    this._userService.deleteUsuario(id).subscribe(res => {
      if(res){ console.log(res);}
      else{ delete this.user[id];}
    })
  }

  view(number){
    if(number == 0){
      this._userService.getSolicitantes().subscribe(data=>{
        this.loading = false;
        console.log('Solicitantes');
        this.tabla = 0
        console.log(data);
        this.user = data;
      })
      return;
    }

    if(number == 1){
      this._userService.getRegistrados().subscribe(data=>{
        this.loading = false;
        this.tabla = 1
        console.log('Registrados');
        console.log(data);
        this.user = data;
      })
      return;
    }

    if(number == 2){
      this._userService.getCancelados().subscribe(data=>{
        this.loading = false;
        this.tabla = 2
        console.log('Cancelados');
        console.log(data);
        this.user = data;
      })
      return;
    }
  }
}
