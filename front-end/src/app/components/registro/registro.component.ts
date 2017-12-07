import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../../interfaces/user.interface";

import { ProfesionesService } from "../../services/profesiones.service";
import { AsociacionesService } from "../../services/asociaciones.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:User={
    Nombre:'',
    Apellidos: '',
    F_Nacimiento: '',
    Email: '',
    ID_Asociacion: 0,
    ID_Profesion: 0,
    ID_Lugar: ''
  }

  id:string;
  profesiones:any[] = [];
  asociaciones:any[] = [];

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

    this.activatedRoute.params.subscribe(parametros=>{
      this.id=parametros['id'];

      /*if(this.id!=="nuevo"){
        this._userService.getUsuario(this.id).subscribe(usu=>{
          this.usuario = usu[0];
        })
      }*/
    })
  }

  guardar(){
    console.log(this.usuario);

    if(this.id=="nuevo"){
      //insertando
      this._userService.nuevoUsuario(this.usuario).subscribe(data=>{
        this.router.navigate(['/heroes'])
      }, error=>console.log(error));
    }
    else{
      //actualizando
      this._userService.actualizarUsuario(this.usuario, this.id).subscribe(data=>{
        console.log(data);
      }, error=>console.log(error));
    }
  }

  ngOnInit() {
  }

}
