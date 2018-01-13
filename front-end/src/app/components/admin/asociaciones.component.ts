import { Component } from '@angular/core';
import { AsociacionesService } from "../../services/asociaciones.service";
import { Asociacion } from "../../interfaces/asociacion.interface";
import { Router } from '@angular/router';


@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html'
})
export class AsociacionesComponent {
  loading:boolean=true;

  asociacion:Asociacion ={
    Nombre:'',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: ''
  }

  mensaje:string = '';
  error:boolean = true;
  constructor(private _asociacionesServices:AsociacionesService, private router:Router) {

    if(sessionStorage.getItem('iD') !== '44'){
      return;
    }
    this.error = false;

    this._asociacionesServices.getAsociaciones().subscribe(data=>{

      this.loading = false;
      console.log(data);
      this.asociacion = data;
    })
  }

  delete(id){
    this._asociacionesServices.deleteAsociacion(id).subscribe(res=>{

      if(res.Resultado === 'OK'){
        this.mensaje = 'Asociación Cancelada!';
        location.href = '/admin/asociaciones#arriba';
        document.getElementById('alert').className = 'alert alert-success';
        delete this.asociacion[id];
        this.loading = true;
        this._asociacionesServices.getAsociaciones().subscribe(data=>{

          this.loading = false;
          console.log(data);
          this.asociacion = data;
        })
      }
      else{
        this.mensaje = 'Ha ocurrido un error!';
        location.href = '/admin/asociaciones#arriba';
        document.getElementById('alert').className = 'alert alert-danger';
      }
    })
  }

  activate(id, email){
    this._asociacionesServices.activateAsociacion(id, email).subscribe(res=>{
      // console.log(res);
      //
      // this.loading = true;
      // this._asociacionesServices.getAsociaciones().subscribe(data=>{
      //
      //   this.loading = false;
      //   console.log(data);
      //   this.asociacion = data;
      // })
    })
  }
}
