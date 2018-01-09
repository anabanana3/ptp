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

  constructor(private _asociacionesServices:AsociacionesService, private router:Router) {
    this._asociacionesServices.getAsociaciones().subscribe(data=>{

      this.loading = false;
      console.log(data);
      this.asociacion = data;
    })
  }

  delete(id){
    this._asociacionesServices.deleteAsociacion(id).subscribe(res=>{

      if(res){console.log(res); }
      else{
        location.reload();
        delete this.asociacion[id];
      }
    })
  }

  activate(id, email){
    this._asociacionesServices.activateAsociacion(id, email).subscribe(res=>{
      if(res){console.log(res); }
      else{
        location.reload();
      }
    })
  }
}
