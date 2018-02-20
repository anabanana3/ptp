import { Component } from '@angular/core';
import { AsociacionesService } from "../../services/asociaciones.service";
import { Asociacion } from "../../interfaces/asociacion.interface";
import { Router } from '@angular/router';


@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html'
})
export class AsociacionesComponent {
  loading:boolean=true;

  asociacion:Asociacion ={
    Nombre:'',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: ''
  }

  mensaje:string = '';
  error:boolean = true;

  //Para la paginacion
  paginas = new Array(3);
  pagNext;
  pagBack;
  tamPag:number=10;
  pagActual;
  constructor(private _asociacionesServices:AsociacionesService, private router:Router) {

    if(sessionStorage.getItem('iD') !== '44'){
      return;
    }
    this.error = false;

    this._asociacionesServices.getAsociaciones(1, this.tamPag).subscribe(data=>{

      this.loading = false;
      console.log(data);
      this.asociacion = data.Data;
      this.paginacion(data.Pagina, data.Paginas_Totales);
    })
  }

  delete(id){
    let asociacion ={
      Email: this.asociacion.Email,
      Asociacion: this.asociacion.Nombre
    }
    this._asociacionesServices.deleteAsociacion(id, asociacion).subscribe(res=>{

      console.log(res);

      if(res.Resultado === 'OK'){
        this.mensaje = 'Asociación Cancelada!';
        location.href = '/admin/asociaciones#arriba';
        document.getElementById('alert').className = 'alert alert-success';
        delete this.asociacion[id];
        this.loading = true;
        this._asociacionesServices.getAsociaciones(1, this.tamPag).subscribe(data=>{
          this.loading = false;
          console.log(data);
          this.asociacion = data.Data;
          this.paginacion(data.Pagina, data.Paginas_Totales);
        })
      }
      else{
        this.mensaje = 'Ha ocurrido un error!';
        location.href = '/admin/asociaciones#arriba';
        document.getElementById('alert').className = 'alert alert-danger';
      }
    })
  }

  activate(id, email){
    this._asociacionesServices.activateAsociacion(id, email).subscribe(res=>{
      console.log(res);
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
      }
    })
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
  //  console.log('Muestro el numero ese de andrea', this.tabla);
    //console.log('Muestro el tamaño de pagina que desea el usuario', tam);
    //this.view(this.tabla, pag, tam);
    this._asociacionesServices.getAsociaciones(pag, this.tamPag).subscribe(data =>{
      this.loading = false;
      console.log(data);
      this.asociacion = data.Data;
      this.paginacion(data.Pagina, data.Paginas_Totales);
      this.pagActual = data.Pagina;
    });
  }
  cambiarTamPag(tam){
    console.log(tam);
    this.tamPag=tam;
    this._asociacionesServices.getAsociaciones(1, this.tamPag).subscribe(data =>{
      this.loading = false;
      console.log(data);
      this.asociacion = data.Data;
      this.paginacion(data.Pagina, data.Paginas_Totales);
    });
    //this.view(this.tabla, 1, this.tamPag);;
  }
}
