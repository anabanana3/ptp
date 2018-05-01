import { Component } from '@angular/core';
import { AsociacionesService } from "../../services/asociaciones.service";
import { Asociacion } from "../../interfaces/asociacion.interface";
import { Router } from '@angular/router';


@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html'
})
export class AsociacionesAdminComponent {
  loading:boolean=true;

  asociacion = [];

  mensaje:string = '';
  searchNombre = null;
  searchEmail = null;
  //Para la paginacion
  paginas = new Array(1);
  pagNext;
  pagBack;
  tamPag:number=10;
  pagActual;
  displayedColumns = ['nombre', 'email', 'estado', 'fecha', 'opciones'];

  constructor(private _asociacionesServices:AsociacionesService, private router:Router) {
    this.getAsociaciones(1, this.tamPag);
  }

  getAsociaciones(pag, tamPag){
    this._asociacionesServices.getAsociaciones(pag, tamPag).subscribe(data=>{
      if(data.Codigo == 501 ){
        location.href = '/expired';
      }else{
        this.loading = false;
        this.asociacion = data.Data;
        this.paginacion(data.Pagina, data.Paginas_Totales);
        this.pagActual = data.Pagina;
      }
    })
  }

  delete(id){
    let asociacion ={
      // Email: this.asociacion.Email,
      // Asociacion: this.asociacion.Nombre
    }
    this._asociacionesServices.deleteAsociacion(id, asociacion).subscribe(res=>{
      if(res.Resultado === 'OK'){
        this.mensaje = 'Asociación Cancelada!';
        location.href = '/admin/asociaciones#arriba';
        document.getElementById('alert').className = 'alert alert-success';
        delete this.asociacion[id];
        this.loading = true;
        this._asociacionesServices.getAsociaciones(1, this.tamPag).subscribe(data=>{
          this.loading = false;
          this.asociacion = data.Data;
          this.paginacion(data.Pagina, data.Paginas_Totales);
        })
      }
      else{
        if(res.Codigo == 501){
          //Ha expirado la sesion
          location.href = '/expired';
        }else{
          this.mensaje = 'Ha ocurrido un error!';
          location.href = '/admin/asociaciones#arriba';
          document.getElementById('alert').className = 'alert alert-danger';
        }
      }
    })
  }

  activate(id, email){
    this._asociacionesServices.activateAsociacion(id, email).subscribe(res=>{
      if(res.Resultado === 'OK'){
        this.loading = true;
        this.mensaje = 'Asociacion validada Correctamente!';
        location.href = '/admin/asociaciones#arriba';
        document.getElementById('alert').className = 'alert alert-success';

        this._asociacionesServices.getAsociaciones(1, this.tamPag).subscribe(data=>{
          this.loading = false;
          this.asociacion = data.Data;
          this.paginacion(data.Pagina, data.Paginas_Totales);
        })
      }else{
        if(res.Codigo == 501){
          location.href = '/expired';
        }
      }
    })
  }

  //Funcion para generar las variables de la paginacion
  paginacion( paginaActual , pagTotales){
    //Total de paginas
    this.paginas = [];
    this.pagActual = paginaActual;
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
    this.getAsociaciones(pag, this.tamPag);
  }

  filter(){
    if(this.searchEmail === '')
      this.searchEmail = null;
    if(this.searchNombre === '')
      this.searchNombre = null;

    if(this.searchNombre === null && this.searchEmail === null){
      this.getAsociaciones(1, this.tamPag);
      return;
    }
    this._asociacionesServices.filtroAsociaciones(this.searchNombre, this.searchEmail, 1, this.tamPag)
      .subscribe(data => {
        if(data.Codigo == 501){
            location.href = '/expired';
        }else{
          this.loading = false;
          this.asociacion = data.Data;
          this.paginacion(data.Pagina, data.Paginas_Totales);
        }
      })
  }
}
