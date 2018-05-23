import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AsociacionesService } from "../../services/asociaciones.service";
import {ProfesionesService} from "../../services/profesiones.service";
import { User } from "../../interfaces/user.interface";

@Component({
  selector: 'app-homeAsociaciones',
  templateUrl: './homeAsociaciones.component.html'
})
export class HomeAsociaciones{
  user = [];

  tabla:number = 0;
  id:number = 0;
  loading:boolean = false;
  asociacion:string = '';
  mensaje:string = '';
  error:boolean = true;

  searchNombre = null;
  searchEmail = null;
  searchProfesion = 0;
  profesiones = [];
  asociaciones = [];

  //Para la paginacion
  paginas = new Array();
  totalPag;
  pagActual;
  pagInicio;
  pagFinal;
  startIndex;
  endIndex;

  tamPag:number = 10;
  displayedColumns = ['nombre', 'email', 'dni', 'opciones'];

  constructor(private _userService:UserService, private _asociacionesService:AsociacionesService,
              private _profesionesService:ProfesionesService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
    this.id = parseInt(sessionStorage.getItem('iD'));

    this._asociacionesService.getAsociacion(this.id).subscribe(data=>{
      this.asociacion = data[0].Nombre.split("'")[1];
    })

    this.getSolicitantes(1, this.tamPag);

    this._profesionesService.getProfesiones().subscribe(data => {
      this.profesiones = data;
    })
  }

  getSolicitantes(pag, tamPag){
    this._userService.getUsuarioSolicitantesAsociacion(this.id, pag, tamPag).subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.user = data.Data;
        this.loading = false;
        this.pagActual = parseInt(data.Pagina);
        this.tamPag = data.Paginas_Totales;
        this.paginacion(data.Paginas_Totales, parseInt(data.Pagina), this.tamPag);
      }
    })
  }

  cancelUser(id){
    this._userService.deleteUsuario(id).subscribe(res => {
      if(res.warningCount == 0){
        this.mensaje = 'Usuario Cancelado!';
        location.href = '/asociacion#arriba';
        document.getElementById('alert').className = 'alert alert-success';
        delete this.user[id];
        this.loading = true;

        this.getSolicitantes(this.pagActual, this.tamPag);
      }
      else{
        if(res.Codigo == 501 ){
          location.href = '/expired';
        }else{
          this.mensaje = 'Ha ocurrido un error!';
          location.href = '/asociacion#arriba';
          document.getElementById('alert').className = 'alert alert-danger';
        }
      }
    })
  }

  activateUser(id, email){
    this._userService.activateUsuario(id, email).subscribe(res=>{
      if(res.Resultado === 'OK'){
        this.loading = true;
        this.mensaje = 'Usuario validado Correctamente!';
        location.href = '/asociacion#arriba';
        document.getElementById('alert').className = 'alert alert-success';

        if(this.tabla === 0){
          this.getSolicitantes(this.pagActual, this.tamPag);

          return;
        }
      }
      else{
        if(res.Codigo == 501 ){
          location.href = '/expired';
        }else{
          this.mensaje = 'HA ocurrido un error!';
          location.href = '/asociacion#arriba';
          document.getElementById('alert').className = 'alert alert-danger';
        }
      }
    })
  }

  cerrarSesion(){
    sessionStorage.clear();
    location.href = '/login';
  }

  view(number, pagina = 1, tam){
    tam = 10;
    this.tabla = number;
    if(number == 0){
      this.getSolicitantes(pagina, tam);
      return;
    }

    if(number == 1){
      this._userService.getUsuarioRegistradosAsociacion(this.id, pagina, tam).subscribe(data=>{
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          this.loading = false;
          this.user = data.Data;
          this.tamPag = data.Elemetos_Pagina;
          this.paginacion(data.Paginas_Totales, parseInt(data.Pagina), this.tamPag);
        }
      })
      return;
    }
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
    this.pagActual = pag;
    this.filter(pag);
  }

  filter(pag){
    let searchProfesion = null;
    if(this.searchEmail === '')
      this.searchEmail = null;
    if(this.searchNombre === '')
      this.searchNombre = null;
    if(this.searchProfesion != 0)
      searchProfesion = this.searchProfesion;

    if(this.searchNombre === null && this.searchEmail === null && searchProfesion === null){
      this.view(this.tabla, 1, this.tamPag);
      return;
    }

    this._userService.filtroUsuarios(this.tabla, this.searchNombre, this.searchEmail, searchProfesion, this.id, 1, this.tamPag)
      .subscribe(data => {
        if(data.Codigo == 501){
            location.href = '/expired';
        }else{
          this.loading = false;
          this.user = data.Data;
          this.paginacion(data.Paginas_Totales, parseInt(data.Pagina), this.tamPag);
        }
      })
  }

}
