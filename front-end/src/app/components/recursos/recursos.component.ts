import { Component } from '@angular/core';
import { MaterialService } from "../../services/material.service";
import {Recurso} from '../../interfaces/recurso.interface';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html'
})
export class RecursosComponent {

  error:boolean = true;
  recursosOld = [];
  recursos = [];
  fieldSearch = '';
  view = 1;

  constructor(private _materialService:MaterialService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    _materialService.getMaterialesPropios().subscribe(data => {
      this.recursosOld = data;
      this.recursos = data;
      document.getElementById("propios").style.fontWeight = "bold";
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  mostrar(view){
    if(view === this.view){
      return;
    }

    this.view = view;
    if(view === 1){
      this._materialService.getMaterialesPropios().subscribe(data => {
        this.recursosOld = data;
        this.recursos = data;
        document.getElementById("publicos").style.fontWeight = "normal";
        document.getElementById("propios").style.fontWeight = "bold";
      }, error => {
        console.log(error);
      })
      return;
    }

    if(view === 2){
      this._materialService.getMaterialesPublicos().subscribe(data => {
        this.recursosOld = data;
        this.recursos = data;
        document.getElementById("propios").style.fontWeight = "normal";
        document.getElementById("publicos").style.fontWeight = "bold";
      }, error => {
        console.log(error);
      })

    }
  }

  buscar(){
    let recursosFound = [];

    if(this.fieldSearch === ''){
      this.recursos = this.recursosOld;
      return;
    }

    if(this.fieldSearch && this.recursosOld){
      for(let i=0; i<this.recursosOld.length; i++){
        if(this.recursosOld[i].Titulo.toLowerCase().includes(this.fieldSearch.toLowerCase())){
          recursosFound.push(this.recursosOld[i]);
        }else if(this.recursosOld[i].Nombre.toLowerCase().includes(this.fieldSearch.toLowerCase())){
          recursosFound.push(this.recursosOld[i]);
        }else if(this.recursosOld[i].Descripcion.toLowerCase().includes(this.fieldSearch.toLowerCase())){
          recursosFound.push(this.recursosOld[i]);
        }
      }
    }

    this.recursos = recursosFound;
  }
}
