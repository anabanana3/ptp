import { Component, OnInit } from '@angular/core';
import { AsociacionesService } from "../../services/asociaciones.service";


@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html',
  styleUrls: ['./asociaciones.component.css']
})
export class AsociacionesComponent implements OnInit {

  asociacion:any[]=[];
  loading:boolean=true;
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
