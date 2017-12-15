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
    ID_Asociacion: 0,
    ID_Profesion: 0,
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
    this._userService.getUsuarios().subscribe(data=>{
      this.loading = false;
      this.user = data;
    })
  }

  cancelUser(id){
    this._userService.deleteUsuario(id).subscribe(res => {
      if(res){ console.log(res);}
      else{ delete this.user[id];}
    })
  }

  view(number){
    if(number == 0){
      
    }

    if(number == 1){

    }
  }
}
