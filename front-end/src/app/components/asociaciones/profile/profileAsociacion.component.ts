import { Component } from '@angular/core';
import {AsociacionesService} from "../../../services/asociaciones.service";
import {Asociacion} from "../../../interfaces/asociacion.interface";

@Component({
  selector: 'app-profileAsociacion',
  templateUrl: './profileAsociacion.component.html'
})
export class ProfileAsociacionComponent {

  id:number = 0;
  change:boolean = false;

  asociacion:Asociacion ={
    Nombre: '',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: '',
    Foto: ''
  }

  constructor(private _asociacionesService:AsociacionesService) {
    this.id = parseInt(sessionStorage.getItem('iD'));

    this._asociacionesService.getAsociacion(this.id).subscribe(data =>{
      this.asociacion = data[0];
      this.asociacion.Nombre = this.asociacion.Nombre.split("'")[1];
      this.asociacion.Email = this.asociacion.Email.split("'")[1];
      this.asociacion.Direccion = this.asociacion.Direccion.split("'")[1];
      this.asociacion.CIF = this.asociacion.CIF.split("'")[1];
      console.log(data);
    })
  }
}
