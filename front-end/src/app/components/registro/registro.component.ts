import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../../interfaces/user.interface";


import { ProfesionesService } from "../../services/profesiones.service";
import { AsociacionesService } from "../../services/asociaciones.service";
import { UserService } from "../../services/user.service";
import { Asociacion } from "../../interfaces/asociacion.interface";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent {

  usuario:User={
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
  }

  asociacion:Asociacion ={
    Nombre:'',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: ''
  }

  id:string;
  profesiones:any[] = [];
  asociaciones:any[] = [];

  usuarios:boolean = true;

  constructor(private _profesionesService:ProfesionesService, private _asociacionesService:AsociacionesService,
    private router:Router, private _userService:UserService, private activatedRoute:ActivatedRoute) {

    this._profesionesService.getProfesiones().subscribe(data=>{
      console.log(data);
      this.profesiones = data;
    })

    this._asociacionesService.getAsociaciones().subscribe(data=>{
      console.log(data);
      this.asociaciones = data;
    })
  }

  new(bool){
    if(!bool){
      this._asociacionesService.newAsociacion(this.asociacion).subscribe(data=>{
        console.log(data);
      }, error=>console.log(error));
    }
    else{
      this.usuario.Direccion = this.usuario.ID_Lugar;
      this._userService.newUsuario(this.usuario).subscribe(data=>{
        console.log(data);
      }, error=>console.log(error));
    }
  }
}
