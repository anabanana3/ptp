import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfesionesService } from "../../services/profesiones.service";
import { AsociacionesService } from "../../services/asociaciones.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  profesiones:any[] = [];
  asociaciones:any[] = [];

  constructor(private _profesionesService:ProfesionesService, private _asociacionesService:AsociacionesService) {

    this._profesionesService.getProfesiones().subscribe(data=>{
      console.log(data);
      this.profesiones = data;
    })

    this._asociacionesService.getAsociaciones().subscribe(data=>{
      console.log(data);
      this.asociaciones = data;
    })
  }

  guardar(){

  }

  ngOnInit() {
  }

}
