import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  error:boolean = true;
  mensaje:string = '';

  constructor(private _asociacionesService:AsociacionesService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    this.id = parseInt(sessionStorage.getItem('iD'));

    this._asociacionesService.getAsociacion(this.id).subscribe(data =>{
      this.asociacion = data[0];
      this.asociacion.Nombre = this.asociacion.Nombre.split("'")[1];
      this.asociacion.Email = this.asociacion.Email.split("'")[1];
      this.asociacion.Direccion = this.asociacion.Direccion.split("'")[1];
      this.asociacion.CIF = this.asociacion.CIF.split("'")[1];
      this.asociacion.Password = null;
      console.log(this.asociacion.Password);
    })
  }

  save(forma:NgForm){
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(!emailRegex.test(this.asociacion.Email)){
      this.mensaje = 'Email mal introducido';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    console.log(this.asociacion);

    this._asociacionesService.updateAsociacion(this.asociacion).subscribe(data => {
      console.log(data);
      this.mensaje = 'Cambios registrados correctamente';
      document.getElementById('alert').className = 'alert alert-success';
    }, error => {
      this.mensaje = 'ALGO MAL';
      document.getElementById('alert').className = 'alert alert-danger';
    })

  }
}
