import { Component, OnInit } from '@angular/core';
import { AsociacionesService } from "../../services/asociaciones.service";
import { Asociacion } from "../../interfaces/asociacion.interface";


@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html'
})
export class AsociacionesComponent implements OnInit {

  loading:boolean=true;

  asociacion: Asociacion ={
    Nombre: '',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: '',
    Validada: 0
  }

  constructor(private _asociacionesServices:AsociacionesService) {
    this._asociacionesServices.getAsociaciones().subscribe(data=>{
      console.log(data);

      this.loading = false;
      this.asociacion = data;

    })
  }

  ngOnInit() {
  }

}
