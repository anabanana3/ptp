import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ExpedientesService} from '../../services/expedientes.service';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html'
})
export class ExpedientesAdminComponent {
  loading:boolean=true;
  mensaje:string = '';
  expediente = [];

  //Para la paginacion
  paginas = new Array(3);
  pagNext;
  pagBack;
  tamPag:number=10;
  pagActual;

  displayedColumns = ['id', 'autor', 'estado', 'opciones'];
  constructor(){

  }

  //Funcion para generar las variables de la paginacion
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

  }
  cambiarTamPag(tam){
    console.log(tam);
    this.tamPag=tam;
  }
}
