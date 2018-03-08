import { Component } from '@angular/core';
import { MaterialService } from "../../services/material.service";
import {Recurso} from '../../interfaces/recurso.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html'
})
export class RecursosComponent {
  loading = false;

  error:boolean = true;

  recursos = [];
  fieldSearch = '';
  view = 0;
  formatos = [];

  selectFormato = null;
  //Para la paginacion
  paginas = new Array(3);
  pagNext;
  pagBack;
  tamPag:number=10;
  pagActual;
  mensaje:string = '';

  constructor(private _materialService:MaterialService,
              private router:Router) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
    this.getMaterialesPropios(1);

    _materialService.getFormatos().subscribe(data => {
      this.formatos = data;
    }, error => {
      console.log(error);
    });

  }

  getMaterialesPropios(pag){
    this._materialService.getMaterialesPropios(pag, this.tamPag).subscribe(data => {
      this.loading = true;
      this.recursos = data.Data;
      document.getElementById("publicos").style.fontWeight = "normal";
      document.getElementById("propios").style.fontWeight = "bold";
      this.paginacion(data.Pagina, data.Paginas_Totales);
    }, error => {
      console.log(error);
    });
  }

  getMaterialesPublicos(pag){
    this._materialService.getMaterialesPublicos(pag, this.tamPag).subscribe(data => {
      this.loading = true;
      this.recursos = data.Data;
      document.getElementById("propios").style.fontWeight = "normal";
      document.getElementById("publicos").style.fontWeight = "bold";
      this.paginacion(data.Pagina, data.Paginas_Totales);
    }, error => {
      console.log(error);
    })
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

    if(this.view === 0){
      this._materialService.searchMaterialPropios(nombre, formato, null, 1, this.tamPag).subscribe(data => {
        this.recursos = data.Data;
        this.paginacion(data.Pagina, data.Paginas_Totales);
      })
    }

    if(this.view === 1){
      this._materialService.searchMaterialPublicos(nombre, formato, 1, null, this.tamPag).subscribe(data => {
        this.recursos = data.Data;
        this.paginacion(data.Pagina, data.Paginas_Totales);
      })
    }
  }

  mostrar(view){
    if(view === this.view){
      return;
    }

    this.view = view;
    if(view === 0){
      this.getMaterialesPropios(1);
    }

    if(view === 1){
      this.getMaterialesPublicos(1);
    }
  }

  paginacion(paginaActual , pagTotales){
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
    if(this.view === 0){
      this.getMaterialesPropios(pag);
    }

    if(this.view === 1){
      this.getMaterialesPublicos(pag);
    }
  }

  editar(id){
    this.router.navigate(['/recurso', id]);
  }

  borrar(id, path){
    this._materialService.deleteMaterial(id, path).subscribe(data => {
      this.mensaje = 'Recurso eliminado correctamente';
      document.getElementById('alert').className = 'alert alert-success';
    }, error => {
      console.log(error);
    })
  }
}
