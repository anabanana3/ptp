import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ExpedientesService} from '../../services/expedientes.service';
import { ProfesionesService } from '../../services/profesiones.service';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html'
})
export class ExpedientesAdminComponent {
  loading:boolean=true;
  mensaje:string = '';
  expediente = [];
  view:number = 1;
  //Para la paginacion
  paginas = new Array(3);
  pagNext;
  pagBack;
  tamPag:number=10;
  pagActual;

  displayedColumns = ['titulo', 'autor', 'fecha', 'options'];

  etnias = new Array();
  profesiones = new Array();
  tiposMGF = new Array();
  url:string = '';
  filtro:number = 1;
  busqueda:boolean = false;

  Filtros ={
    Autor:'',
    Profesion:0,
    Titulo:'',
    Fecha1:'',
    Fecha2:'',
    Lugar:'',
    Etnia:0,
    TipoMGF:0,
    Orden:this.filtro
  }

  constructor(private _expedientesServices:ExpedientesService, private _profService:ProfesionesService){
    //Recupero las etnias para añadirlas al menu de busqueda
    this._expedientesServices.getEtnias().subscribe(data=>this.etnias = data);
    this._expedientesServices.getTipoMutilacion().subscribe(data=>this.tiposMGF = data);
    this._profService.getProfesiones().subscribe(data=>this.profesiones = data);
    //Recupero los 10 ultimos expedientes
    let url = 'https://aisha.ovh/api/publicos/search/autor=null&profesion=null&titulo=null&f1=null&f2=null&l=null&e=null&tipo=null/pag=1&n=10';
    this._expedientesServices.buscar2Exp(url).subscribe(data =>{
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.expediente = data.Data;
        console.log(this.expediente);
        this.loading = false;
        this.paginacion(data.Pagina, data.Paginas_Totales);
      }
    })
  }

  buscar(pag){
    let tam = this.tamPag;
    console.log(this.Filtros);
    this.url='https://www.aisha.ovh/api/publicos/search/';
    let primero = 1;
    if(this.Filtros.Autor != ''){
      this.url += 'autor='+this.Filtros.Autor;
    }else{
      this.url += 'autor='+null;
    }
    if(this.Filtros.Profesion != 0){
      this.url += '&profesion='+this.Filtros.Profesion;
    }else{
      this.url += '&profesion='+null ;
    }
    if(this.Filtros.Titulo != ''){
      //No son nulos => los pongo tal cual
      this.url += '&titulo='+this.Filtros.Titulo;
    }else{
      this.url += '&titulo='+null;
    }
    if(this.Filtros.Fecha1 != ''){
      this.url += '&f1='+this.Filtros.Fecha1;
    }else{
      this.url += '&f1='+null;
    }
    if(this.Filtros.Fecha2 != ''){
      this.url += '&f2='+this.Filtros.Fecha2;
    }else{
      this.  url += '&f2='+null;
    }
    //Lugar
    if(this.Filtros.Lugar != ''){
      this.url += '&l='+this.Filtros.Lugar;
    }else{
      this.url += '&l='+null;
    }
    //Etnia
    if(this.Filtros.Etnia != 0){
      this.url += '&e='+this.Filtros.Etnia
    }else{
      this.  url += '&e='+null;
    }
    //TipoMGF
    if(this.Filtros.TipoMGF != 0){
      this.url += '&tipo='+this.Filtros.TipoMGF;
    }else{
      this.url += '&tipo='+null;
    }

   //Añado los parametros de la paginacion
   this.url += '/pag='+pag+'&n='+tam;

   console.log('Muestro la url que mando al servicio');
   console.log(this.url);
   this._expedientesServices.buscar2Exp(this.url).subscribe(data=>{
     console.log(data);
     if(data.Resultado == 'OK'){
       console.log('No hay resultados');
       this.expediente = new Array();
       //Falta mostrar mensaje de no hay resultados
       this.busqueda = true;
       this.mensaje = 'No hay resultados para la busqueda solicitada';
       document.getElementById('alert').className = 'alert alert-danger';
       //return;

     }else{
       if(data.Codigo == 501 ){
          location.href = '/expired';
       }else{
         console.log('Hay busqueda');
         this.busqueda = true;
         this.expediente = data.Data;
         this.mensaje = '';
         //this.paginacion(data.Pagina, data.Paginas_Totales);
       }
     }
   });
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
  }

  pasarPagina(pag){
    console.log(pag);
    this._expedientesServices.getExpedientes(pag, this.tamPag).subscribe(data => {
      if(data.Codigo == 501){
        location.href == '/expired';
      }else{
        console.log(data);
        this.expediente = data.Data;
        this.loading = false;
        this.paginacion(data.Pagina, data.Paginas_Totales);
      }
    })
  }

  cambiarTamPag(tam){
    console.log(tam);
    this.tamPag=tam;
  }

  changeView(view){
    console.log(view);
    this.view = view;
  }

  borrarExpediente(id){
    console.log('Borrar' + id);
  }
}
