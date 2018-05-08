import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';
import { ProfesionesService } from '../../services/profesiones.service';

@Component({
  selector: 'app-bib-expedientes',
  templateUrl: './bib-expedientes.component.html'
})
export class BibExpedientesComponent implements OnInit {
  expedientes = new Array();
  //Para la paginacion
  paginas = new Array();
  pagNext:number;
  pagBack:number;
  pagActual:number;
  tamPag:number=10;
  error:boolean=true;
  busqueda:boolean = false;
  mensaje:string='';
//Url para hacer las busquedas
  url:string='';


//Variables para filtar los expedientes
etnias = new Array();
profesiones = new Array();
  n:number = 1;
  tiposMGF = new Array();
  filtro:number=1;
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

  asociacion:boolean = false;
  admin:boolean = false;
  usuario:boolean = false;

  constructor(private _expedientesService:ExpedientesService, private _profService:ProfesionesService ) {
      if(sessionStorage.length == 0){
        return;
      }
      this.error = false;
      //Recupero las etnias para añadirlas al menu de busqueda
      this._expedientesService.getEtnias().subscribe(data=>this.etnias = data);
      this._expedientesService.getTipoMutilacion().subscribe(data=>this.tiposMGF = data);
      this._profService.getProfesiones().subscribe(data=>this.profesiones = data);
      //Recupero los 10 ultimos expedientes
      let url = 'https://aisha.ovh/api/publicos/search/autor=null&profesion=null&titulo=null&f1=null&f2=null&l=null&e=null&tipo=null/pag=1&n=10';
      this._expedientesService.buscar2Exp(url).subscribe(data =>{
        if(data.Codigo == 501 ){
          location.href = '/expired';
        }else{
          this.expedientes = data.Data;
        }
      })

      if(sessionStorage.getItem('asociacion') != null){
        this.asociacion = true;
      }else if(sessionStorage.getItem('usuario') != null){
        this.usuario = true;
      }else if(sessionStorage.getItem('admin') != null){
        this.admin = true;
      }
   }

   buscar2(pag, tam=this.tamPag){
     console.log(this.Filtros);
   }

   buscar(pag, tam=this.tamPag){
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
    this._expedientesService.buscar2Exp(this.url).subscribe(data=>{
      console.log(data);
      if(data.Resultado == 'OK'){
        console.log('No hay resultados');
        this.expedientes = new Array();
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
          this.expedientes = data.Data;
          this.mensaje = '';
          //this.paginacion(data.Pagina, data.Paginas_Totales);
        }
      }
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
       this.buscar(pag);
   }

  ngOnInit() {
  }

}
