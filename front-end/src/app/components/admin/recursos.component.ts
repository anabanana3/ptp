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
  paginas = new Array();
  totalPag;
  pagActual;
  pagInicio;
  pagFinal;
  startIndex;
  endIndex;
  tamPag:number=10;
  busqueda:boolean = false;
  displayedColumns = ['titulo', 'estado', 'opciones'];
  mensaje;

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
        this.paginacion(data.Paginas_Totales,data.Pagina, this.tamPag);
        this.pagActual = data.Pagina;
      }
    }, error => {
      console.log(error);
    })
  }

  paginacion(totalPag, pagActual, tamPag){
    let pagInicio, pagFinal;
    if(totalPag <= 10){
      pagInicio = 1;
      pagFinal = totalPag;
    }else{
      if(pagActual <= 6){
        pagInicio = 1;
        pagFinal = 10;
      }else if(pagActual + 4 >= totalPag){
        pagInicio = totalPag - 9;
        pagFinal = totalPag;
      }else{
        pagInicio = pagActual - 5;
        pagFinal = pagActual + 4;
      }
    }

    let startIndex = (pagActual -1)*tamPag;
    let endIndex = Math.min(startIndex + tamPag - 1, totalPag - 1);

    let pages = Array.from(Array((pagFinal + 1) - pagInicio).keys()).map(i => pagInicio + i);

    //Despues de tener todo calculado guardo los datos
    this.pagActual = pagActual;
    this.pagInicio = pagInicio;
    this.pagFinal = pagFinal;
    this.startIndex = startIndex;
    this.paginas = pages;
    this.totalPag = totalPag;
  }

  pasarPagina(pag){
    if(this.busqueda == false){
      this.getMateriales(pag, this.tamPag);
    }else{
      this.buscar();
    }
  }

  buscar(e?){

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
        this.busqueda = true;
        this.paginacion(data.Paginas_Totales,data.Pagina, this.tamPag);
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
