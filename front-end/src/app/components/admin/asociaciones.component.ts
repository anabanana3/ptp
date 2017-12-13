import { Component, OnInit } from '@angular/core';
import { AsociacionesService } from "../../services/asociaciones.service";
import { Asociacion } from "../../interfaces/asociacion.interface";
import { Router } from '@angular/router';


@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html'
})
export class AsociacionesComponent implements OnInit {

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
      console.log(data);

      this.loading = false;
      this.asociacion = data;

    })
  }

  borrar(id){
    console.log(id);

    this._asociacionesServices.deleteAsociacion(id).subscribe(res=>{
      if(res){
        console.log(res);
      }
      else{
        delete this.asociacion[id];
      }
    })
  }

  ngOnInit() {
  }

}
