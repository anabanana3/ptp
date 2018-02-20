import { Component } from '@angular/core';
import { MaterialService } from "../../services/material.service";
import {Recurso} from '../../interfaces/recurso.interface';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html'
})
export class RecursosComponent {
  loading = false;

  error:boolean = true;
  recursosOld = [];
  recursos = [];
  fieldSearch = '';
  view = 1;
  formatos = [];
  //Para la paginacion
  paginas = new Array();
  pagNext;
  pagBack;
  tamPag:number=10;
  pagActual;

  constructor(private _materialService:MaterialService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    _materialService.getMaterialesPropios(1, this.tamPag).subscribe(data => {
        if(data.Resultado === 'ERROR'){
          console.log('Hola doy error');
          console.log(data);
        }else{
          this.recursosOld = data.Data;
          this.recursos = data.Data;
          this.loading = true;
          document.getElementById("propios").style.fontWeight = "bold";
          console.log(data);
          this.paginacion(data.Pagina, data.Paginas_Totales);
        }
    }, error => {
      console.log(error);
    });

    _materialService.getFormatos().subscribe(data => {
      this.formatos = data;
      console.log('Hola');
      console.log(this.formatos);
    }, error => {
      console.log(error);
    });

  }

  filterFormato(id){
    console.log(id);
  }

  mostrar(view){
    if(view === this.view){
      return;
    }

    this.view = view;
    if(view === 1){
      this._materialService.getMaterialesPropios(1, this.tamPag).subscribe(data => {
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
      this._materialService.getMaterialesPublicos(1, this.tamPag).subscribe(data => {
        console.log(data);
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
        }else if(this.recursosOld[i].Nombre !== undefined && this.recursosOld[i].Nombre.toLowerCase().includes(this.fieldSearch.toLowerCase())){
          recursosFound.push(this.recursosOld[i]);
        }else if(this.recursosOld[i].Descripcion.toLowerCase().includes(this.fieldSearch.toLowerCase())){
          recursosFound.push(this.recursosOld[i]);
        }
      }
    }

    this.recursos = recursosFound;
  }

  paginacion( paginaActual , pagTotales){
    //Total de paginas
    this.paginas = [];
    for(let i=0; i<pagTotales; i++){
      this.paginas.push(i);
    }
    //Pagina anterior
    if(paginaActual >= 2){
      this.pagBack = (paginaActual-1);
    }else{
      this.pagBack = paginaActual;
    }
    //Pagina Siguiente
    if(paginaActual < pagTotales){
      this.pagNext = (paginaActual+1);
    }else{
      this.pagNext = paginaActual;
    }
    console.log("Total de paginas", this.paginas.length);
    console.log('PAgina Actual', paginaActual);
    console.log("Pagina Siguiente", this.pagNext);
    console.log("Pagina anterior", this.pagBack);
  }

  pasarPagina(pag){
    console.log(pag);
    this._materialService.getMateriales(pag, this.tamPag).subscribe(data =>{
      this.loading = false;
      console.log(data);
      this.recursos = data.Data;
      this.paginacion(data.Pagina, data.Paginas_Totales);
      this.pagActual = data.Pagina;
    });
  }
}
