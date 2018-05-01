import { Component } from '@angular/core';
import {MaterialService} from '../../services/material.service'
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-recursos-admin',
  templateUrl: './recursos.component.html'
})
export class RecursosAdminComponent{
  loading:boolean=true;

  recursos = [];
  recursosOLD = [];
  selectFormato = 0;
  fieldSearch = null;
  formatos = [];
  //Para la paginacion
  paginas = new Array(1);
  pagNext;
  pagBack;
  tamPag:number=10;
  pagActual;
  displayedColumns = ['titulo', 'estado', 'opciones'];

  constructor(private _materialService:MaterialService) {
    this.getMateriales(1, this.tamPag);

    _materialService.getFormatos().subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.formatos = data;
      }
    }, error => {
      console.log(error);
    });
  }

  getMateriales(pag, tamPag){
    this._materialService.getMateriales(pag, tamPag).subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.recursos = data.Data;
        this.loading = false;
        this.paginacion(data.Pagina, data.Paginas_Totales);
        this.pagActual = data.Pagina;
      }
    }, error => {
      console.log(error);
    })
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
  }

  pasarPagina(pag){
    this.getMateriales(pag, this.tamPag);
  }

  buscar(){
    let nombre = null;
    let formato = null;

    if(this.selectFormato && this.selectFormato != 0){formato = this.selectFormato;}

    if(this.fieldSearch){nombre = this.fieldSearch;}

    if(this.selectFormato == 0 && (this.fieldSearch == null || this.fieldSearch == '')){
      this.getMateriales(1, this.tamPag);
      return;
    }

    this._materialService.searchMaterialPublicos(nombre, formato, null, 1, this.tamPag).subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.recursos = data.Data;
        this.paginacion(data.Pagina, data.Paginas_Totales);
      }
    })
  }

  borrarMaterial(id, path){
    this._materialService.deleteMaterial(id, path).subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }
    }, error => {
      console.log(error);
    })
  }
}
