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

  asociacion:boolean = false;
  admin:boolean = false;
  usuario:boolean = false;

  mostrarForm:boolean = false;

  constructor(private _materialService:MaterialService,
              private router:Router) {
    if(sessionStorage.length === 0){
      return;
    }

    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }else if(sessionStorage.getItem('usuario') != null){
      this.usuario = true;
    }else if(sessionStorage.getItem('admin') != null){
      this.admin = true;
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
      if(data.Codigo == 501){
        location.href ='/expired';
      }else{
        this.loading = true;
        this.recursos = data.Data;
        document.getElementById("publicos").style.fontWeight = "normal";
        document.getElementById("propios").style.fontWeight = "bold";
        this.paginacion(data.Pagina, data.Paginas_Totales);
      }
    }, error => {
      console.log(error);
    });
  }

  getMaterialesPublicos(pag){
    this._materialService.getMaterialesPublicos(pag, this.tamPag).subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.loading = true;
        this.recursos = data.Data;
        document.getElementById("propios").style.fontWeight = "normal";
        document.getElementById("publicos").style.fontWeight = "bold";
        this.paginacion(data.Pagina, data.Paginas_Totales);
      }
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
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          this.recursos = data.Data;
          this.paginacion(data.Pagina, data.Paginas_Totales);
        }
      })
    }

    if(this.view === 1){
      this._materialService.searchMaterialPublicos(nombre, formato, 1, null, this.tamPag).subscribe(data => {
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          this.recursos = data.Data;
          this.paginacion(data.Pagina, data.Paginas_Totales);
        }
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

  openPopUp(){
      // Get the modal
    var modal = document.getElementById('popupBorrar');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtnDelete");
    var btnSi = document.getElementById("siBorrar");
    var btnNo = document.getElementById("noBorrar");

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    btnSi.onclick = function(){
      modal.style.display = "none";
    }

    btnNo.onclick = function(){
      modal.style.display = "none";
    }

    span.onclick = function() {
        console.log("entro en span.onclick");
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    console.log("entro en windon.onclick");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
  }

  borrar(id, path){
    this._materialService.deleteMaterial(id, path).subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.mensaje = 'Recurso eliminado correctamente';
        document.getElementById('alert').className = 'alert alert-success';
      }
    }, error => {
      console.log(error);
    })
  }

  mostrarFilters(){
    this.mostrarForm = !this.mostrarForm;
    if(this.mostrarForm){
      document.getElementById("formFilter").className="mostrar-form";
      document.getElementById("lateralSearch").className="lateralSearch mostrar-lateralSearch";
      document.getElementById("divContainer").className="carpetasDivContainer ocultar-carpetasDivContainer";
    }
    else{
      document.getElementById("formFilter").className="ocultar-form";
      document.getElementById("lateralSearch").className="lateralSearch ocultar-lateralSearch";
      document.getElementById("divContainer").className="carpetasDivContainer mostrar-carpetasDivContainer";
    }
  }
}
