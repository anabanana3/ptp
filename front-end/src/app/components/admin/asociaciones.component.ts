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
  paginas = new Array();
  totalPag;
  pagActual;
  pagInicio;
  pagFinal;
  startIndex;
  endIndex;
  tamPag = 10;
  busqueda:boolean = false;
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
        this.paginacion(data.Paginas_Totales, data.Pagina, this.tamPag);
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
          this.paginacion(data.Paginas_Totales, data.Pagina, this.tamPag)
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
          this.paginacion(data.Paginas_Totales, data.Pagina, this.tamPag)
        })
      }else{
        if(res.Codigo == 501){
          location.href = '/expired';
        }
      }
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
    console.log(pages);
  }


 pasarPagina(pag){
   console.log('Paso a la pagina');
   console.log(pag);
   this.filter(pag);
 }


filter(pag){
  if(this.searchEmail === '')
    this.searchEmail = null;
  if(this.searchNombre === '')
    this.searchNombre = null;
    if(this.searchNombre === null && this.searchEmail === null){
    this.getAsociaciones(pag, this.tamPag);
    return;
  }
  this._asociacionesServices.filtroAsociaciones(this.searchNombre, this.searchEmail, pag, this.tamPag)
    .subscribe(data => {
      if(data.Codigo == 501){
          location.href = '/expired';
      }else{
        this.loading = false;
        this.asociacion = data.Data;
        this.busqueda = true;
        this.paginacion(data.Paginas_Totales, data.Pagina, this.tamPag)
      }
    })
  }
}
