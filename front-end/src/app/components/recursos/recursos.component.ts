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

  recursosPublicosOld = [];
  recursosPublicos = [];
  recursosPropiosOld = [];
  recursosPropios = [];
  recursos = [];
  fieldSearch = '';
  view = 0;
  formatos = [];

  selectFormato = '';
  //Para la paginacion
  paginas = new Array();
  pagNext;
  pagBack;
  tamPag:number=10;
  pagActual;

  constructor(private _materialService:MaterialService,
              private router:Router) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    _materialService.getMaterialesPropios(1, this.tamPag).subscribe(data => {
      if(data.Resultado === 'ERROR')
        return;

      this.recursosPropiosOld = data.Data;
      this.recursosPropios = data.Data;
      this.loading = true;
      document.getElementById("propios").style.fontWeight = "bold";
      this.recursos = this.recursosPropios;
      console.log(data);
    }, error => {
      console.log(error);
    });

    _materialService.getMaterialesPublicos(1, this.tamPag).subscribe(data => {
      console.log(data);
      this.loading = true;
      this.recursosPublicosOld = data;
      this.recursosPublicos = data;
    }, error => {
      console.log(error);
    })

    _materialService.getFormatos().subscribe(data => {
      this.formatos = data;
    }, error => {
      console.log(error);
    });

  }

  buscar(){
    console.log(this.selectFormato);
    console.log(this.fieldSearch);
    let nombre = null;
    let formato = null;

    if(this.selectFormato){
      formato = this.selectFormato;
    }

    if(this.fieldSearch){
      nombre = this.fieldSearch;
    }

    let id = this.view;

    console.log(id);

    this._materialService.searchMaterial(nombre, formato, id, 1, this.tamPag).subscribe(data => {
      console.log(data);
      this.recursosPropiosOld = data.Data;
      this.recursosPropios = data.Data;
    })
  }

  mostrar(view){
    if(view === this.view){
      return;
    }

    this.view = view;
    if(view === 0){
      this.recursos = this.recursosPropios;
      document.getElementById("publicos").style.fontWeight = "normal";
      document.getElementById("propios").style.fontWeight = "bold";
    }

    if(view === 1){
      this.recursos = this.recursosPublicos;
      document.getElementById("propios").style.fontWeight = "normal";
      document.getElementById("publicos").style.fontWeight = "bold";
    }
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

  editar(id){
    this.router.navigate(['/recurso', id]);
  }

  borrar(id, path){
    console.log(id);
    console.log(path);
    this._materialService.deleteMaterial(id, path).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
}
