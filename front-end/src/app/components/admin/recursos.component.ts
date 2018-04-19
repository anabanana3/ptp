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
  selectFormato;
  fieldSearch;
  formatos = [];
  //Para la paginacion
  paginas = new Array(3);
  pagNext;
  pagBack;
  tamPag:number=10;
  pagActual;
  displayedColumns = ['id', 'titulo', 'estado', 'opciones'];

  constructor(private _materialService:MaterialService) {

    _materialService.getMateriales(1, this.tamPag).subscribe(data => {
      if(data.Codigo == 501){
        //La sesion ha expirado
        location.href = '/expired';
      }else{
        console.log(data);
        this.recursos = data.Data;
        console.log(data);
        this.loading = false;
        this.paginacion(data.Pagina, data.Paginas_Totales);
      }
    }, error => {
      console.log(error);
    })

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
    this._materialService.getMateriales(pag, this.tamPag).subscribe(data =>{
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.loading = false;
        this.recursos = data.Data;
        this.paginacion(data.Pagina, data.Paginas_Totales);
        this.pagActual = data.Pagina;
      }
    });
  }

  buscar(){
    let nombre = null;
    let formato = null;

    if(this.selectFormato){
      formato = this.selectFormato;
    }

    if(this.fieldSearch){
      nombre = this.fieldSearch;
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
    console.log(id);
    console.log(path);
    this._materialService.deleteMaterial(id, path).subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
}
