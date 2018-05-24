import { Component, ElementRef, AfterViewInit, NgZone, ViewChild, OnInit} from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';
import { ProfesionesService } from '../../services/profesiones.service';
import { Router, ActivatedRoute } from '@angular/router';

import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-bib-expedientes',
  templateUrl: './bib-expedientes.component.html'
})
export class BibExpedientesComponent implements OnInit {
  expedientes = new Array();
  //Para la paginacion
  paginas = new Array();
  totalPag;
  pagActual;
  pagInicio;
  pagFinal;
  startIndex;
  endIndex;
  tamPag:number=15;
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

  mostrarForm:boolean = false;

  sitio;
  idSitio;

  @ViewChild('place') public searchElement: ElementRef;


  constructor(private _expedientesService:ExpedientesService, private _profService:ProfesionesService, private router:ActivatedRoute,private element:ElementRef, private ngZone:NgZone, private mapsAPILoader: MapsAPILoader) {
      if(sessionStorage.length == 0){
        return;
      }
      this.error = false;
      //Recupero las etnias para añadirlas al menu de busqueda
      this._expedientesService.getEtnias().subscribe(data=>this.etnias = data);
      this._expedientesService.getTipoMutilacion().subscribe(data=>this.tiposMGF = data);
      this._profService.getProfesiones().subscribe(data=>this.profesiones = data);
      //Recupero los 10 ultimos expedientes
      let url = 'https://aisha.ovh/api/publicos/search/autor=null&profesion=null&titulo=null&f1=null&f2=null&l=null&e=null&tipo=null/pag=1&n='+this.tamPag;
      this._expedientesService.buscar2Exp(url).subscribe(data =>{
        if(data.Codigo == 501 ){
          location.href = '/expired';
        }else{
          this.expedientes = data.Data;
          this.paginacion(data.Paginas_Totales, data.Pagina, this.tamPag);
        }
      })

      if(sessionStorage.getItem('asociacion') != null){
        this.asociacion = true;
      }else if(sessionStorage.getItem('usuario') != null){
        this.usuario = true;
      }else if(sessionStorage.getItem('admin') != null){
        this.admin = true;
      }

      if(sessionStorage.FTitulo != undefined){
        this.buscar2(sessionStorage.FPagina,this.tamPag);
        console.log("ENTRO");
      }
   }

   buscar2(pag, tam=this.tamPag){
     //metodo para mantener la busqueda anterior
     this.Filtros.Autor = sessionStorage.FAutor;
     this.Filtros.Profesion = sessionStorage.FProfesion;
     this.Filtros.Titulo = sessionStorage.FTitulo;
     this.Filtros.Fecha1 = sessionStorage.FFecha1;
     this.Filtros.Fecha2 = sessionStorage.FFecha2;
     this.Filtros.Lugar = sessionStorage.FLugar;
     this.Filtros.Etnia = sessionStorage.FEtnia;
     this.Filtros.TipoMGF = sessionStorage.FTipoMGF;
     pag = sessionStorage.FPagina;

     //Obtengo los datos de Google Maps

     console.log(this.Filtros);
     this.url='https://www.aisha.ovh/api/publicos/search/';
     let primero = 1;
     if(sessionStorage.FAutor != ''){
       // this.url += 'autor='+this.Filtros.Autor;
       this.url += 'autor='+sessionStorage.FAutor;
     }else{
       this.url += 'autor='+null;
     }
     if(parseInt(sessionStorage.FProfesion) != 0){
       this.url += '&profesion='+parseInt(sessionStorage.FProfesion);
     }else{
       this.url += '&profesion='+null ;
     }
     if(sessionStorage.FTitulo != ''){
       //No son nulos => los pongo tal cual
       this.url += '&titulo='+sessionStorage.FTitulo;
     }else{
       this.url += '&titulo='+null;
     }
     if(sessionStorage.FFecha1 != ''){
       this.url += '&f1='+sessionStorage.FFecha1;
     }else{
       this.url += '&f1='+null;
     }
     if(sessionStorage.FFecha2 != ''){
       this.url += '&f2='+sessionStorage.FFecha2;
     }else{
       this.  url += '&f2='+null;
     }
     //Lugar
     if(sessionStorage.FLugar != null){
       this.url += '&l='+sessionStorage.FLugar;
     }else{
       this.url += '&l='+null;
     }
     //Etnia
     if(parseInt(sessionStorage.FEtnia) != 0){
       this.url += '&e='+parseInt(sessionStorage.FEtnia)
     }else{
       this.  url += '&e='+null;
     }
     //TipoMGF
     if(parseInt(sessionStorage.FTipoMGF) != 0){
       this.url += '&tipo='+parseInt(sessionStorage.FTipoMGF);
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
        if(document.getElementById('alert'))
        document.getElementById('alert').className = 'alert alert-danger';
        //return;

      }else{
        if(data.Codigo == 501 ){
          location.href = '/expired';
        }else{
          console.log('Hay busqueda');
          this.busqueda = true;
          this.expedientes = data.Data;
          this.paginacion(data.Paginas_Totales, data.Pagina, this.tamPag);
          this.mensaje = '';
          //this.paginacion(data.Pagina, data.Paginas_Totales);
        }
      }
    });
   }

   buscar(pag, tam=this.tamPag){
     console.log(this.Filtros);
     sessionStorage.setItem('FAutor', this.Filtros.Autor);
     sessionStorage.setItem('FProfesion', this.Filtros.Profesion.toString());
     sessionStorage.setItem('FTitulo', this.Filtros.Titulo);
     sessionStorage.setItem('FFecha1', this.Filtros.Fecha1);
     sessionStorage.setItem('FFecha2', this.Filtros.Fecha2);
     // sessionStorage.setItem('FLugar', this.Filtros.Lugar);
     sessionStorage.setItem('FEtnia', this.Filtros.Etnia.toString());
     sessionStorage.setItem('FTipoMGF', this.Filtros.TipoMGF.toString());
     sessionStorage.setItem('FPagina', pag.toString());

     this.Filtros.Lugar = null;
     if(this.sitio.gm_accessors_.place.gd.b == true && this.sitio.gm_accessors_.place.gd.l != ''){
       let idLugar = this.sitio.gm_accessors_.place.gd.place.id;
       this.Filtros.Lugar = idLugar;
       sessionStorage.setItem('FLugar', idLugar);
     }else{
       sessionStorage.setItem('FLugar', null);
     }
     console.log(sessionStorage);
     this.url='https://www.aisha.ovh/api/publicos/search/';
     let primero = 1;
     if(sessionStorage.FAutor != ''){
       // this.url += 'autor='+this.Filtros.Autor;
       this.url += 'autor='+sessionStorage.FAutor;
     }else{
       this.url += 'autor='+null;
     }
     if(parseInt(sessionStorage.FProfesion) != 0){
       this.url += '&profesion='+parseInt(sessionStorage.FProfesion);
     }else{
       this.url += '&profesion='+null ;
     }
     if(sessionStorage.FTitulo != ''){
       //No son nulos => los pongo tal cual
       this.url += '&titulo='+sessionStorage.FTitulo;
     }else{
       this.url += '&titulo='+null;
     }
     if(sessionStorage.FFecha1 != ''){
       this.url += '&f1='+sessionStorage.FFecha1;
     }else{
       this.url += '&f1='+null;
     }
     if(sessionStorage.FFecha2 != ''){
       this.url += '&f2='+sessionStorage.FFecha2;
     }else{
       this.  url += '&f2='+null;
     }
     //Lugar
     if(this.Filtros.Lugar != null){
       this.url += '&l='+sessionStorage.FLugar;
      }else{
        this.url += '&l='+null;
      }
    //  if(sessionStorage.FLugar != ''){
    //    this.url += '&l='+sessionStorage.FLugar;
    //  }else{
    //    this.url += '&l='+null;
    //  }
     //Etnia
     if(parseInt(sessionStorage.FEtnia) != 0){
       this.url += '&e='+parseInt(sessionStorage.FEtnia)
     }else{
       this.  url += '&e='+null;
     }
     //TipoMGF
     if(parseInt(sessionStorage.FTipoMGF) != 0){
       this.url += '&tipo='+parseInt(sessionStorage.FTipoMGF);
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
          this.paginacion(data.Paginas_Totales, data.Pagina, this.tamPag);
          //this.paginacion(data.Pagina, data.Paginas_Totales);
        }
      }
    });
   }
   borrarBusqueda(){
     this.Filtros.Autor = "";
     sessionStorage.FAutor = "";
     this.Filtros.Profesion = 0;
     sessionStorage.FProfesion = "";
     this.Filtros.Titulo = "";
     sessionStorage.FTitulo = "";
     this.Filtros.Fecha1 = "";
     sessionStorage.FFecha1 = "";
     this.Filtros.Fecha2 = "";
     sessionStorage.FFecha2 = "";
     this.Filtros.Lugar = null;
     sessionStorage.FLugar = "";
     this.Filtros.Etnia = 0;
     sessionStorage.FEtnia = "";
     this.Filtros.TipoMGF = 0;
     sessionStorage.FTipoMGF = 0;
     sessionStorage.FPagina = 1;
     this.buscar(sessionStorage.FPagina,this.tamPag);
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

     let pages = new Array();
     if(totalPag != undefined){
        pages = Array.from(Array((pagFinal + 1) - pagInicio).keys()).map(i => pagInicio + i);
     }

     //Despues de tener todo calculado guardo los datos
     this.pagActual = pagActual;
     this.pagInicio = pagInicio;
     this.pagFinal = pagFinal;
     this.startIndex = startIndex;
     this.paginas = pages;
     this.totalPag = totalPag;
   }


  pasarPagina(pag){
    this.buscar(pag)
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

   ngOnInit() {
    this.apiGoogle();
  }
  apiGoogle(){
    this.mapsAPILoader.load().then(
      () =>{
        this.sitio = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["geocode"] });

        this.sitio.addListener('place_change', () => {
            this.ngZone.run(()=>{
              let place: google.maps.places.PlaceResult = this.sitio.getPlace();
              this.idSitio = place.id;

              if(place.geometry === undefined || place.geometry === null){
                return
              }
            });
        })
      }
    );
  }

}
