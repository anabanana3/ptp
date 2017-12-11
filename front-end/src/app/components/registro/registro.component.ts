import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Solicitante } from "../../interfaces/solicitante.interface";

import { ProfesionesService } from "../../services/profesiones.service";
import { AsociacionesService } from "../../services/asociaciones.service";
import { SolicitanteService } from "../../services/solicitante.service";
import { Asociacion } from "../../interfaces/asociacion.interface";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:Solicitante={
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
    Nombre: '',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: '',
    Validada: 0
  }

  id:string;
  profesiones:any[] = [];

  usuarios:boolean = true;

  constructor(private _profesionesService:ProfesionesService, private _asociacionesService:AsociacionesService,
    private router:Router, private _userService:SolicitanteService, private activatedRoute:ActivatedRoute) {

    this._profesionesService.getProfesiones().subscribe(data=>{
      console.log(data);
      this.profesiones = data;
    })

    this._asociacionesService.getAsociaciones().subscribe(data=>{
      console.log(data);
      this.asociacion = data;
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
        this.router.navigate(['/'])
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

  registrar(bool){
    if(!bool){
      this._asociacionesService.nuevaAsociacion(this.asociacion)
          .subscribe(data=>{

          })
    }

  }
}
