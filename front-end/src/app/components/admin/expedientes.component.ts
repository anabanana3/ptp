import { Component, ElementRef, AfterViewInit, NgZone, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ExpedientesService} from '../../services/expedientes.service';
import { ProfesionesService } from '../../services/profesiones.service';

import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html'
})
export class ExpedientesAdminComponent {
  loading:boolean=true;
  mensaje:string = '';
  expediente = [];
  view:number = 1;
  tamPag:number=10;

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

  sitio;
  idSitio;

  //Para la paginacion
  paginas = new Array();
  totalPag;
  pagActual;
  pagInicio;
  pagFinal;
  startIndex;
  endIndex;

  @ViewChild('place') public searchElement: ElementRef;

  constructor(private _expedientesServices:ExpedientesService, private _profService:ProfesionesService,private element:ElementRef, private ngZone:NgZone, private mapsAPILoader: MapsAPILoader){
    //Recupero las etnias para añadirlas al menu de busqueda
    this._expedientesServices.getEtnias().subscribe(data=>this.etnias = data);
    this._expedientesServices.getTipoMutilacion().subscribe(data=>this.tiposMGF = data);
    this._profService.getProfesiones().subscribe(data=>this.profesiones = data);
    //Recupero los 10 ultimos expedientes
    let url = 'https://aisha.ovh/api/expedientes/search/autor=null&profesion=null&titulo=null&f1=null&f2=null&l=null&e=null&tipo=null/pag=1&n=10';
    this._expedientesServices.buscar2Exp(url).subscribe(data =>{
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.expediente = data.Data;
        console.log(this.expediente);
        this.loading = false;
        this.paginacion(data.Paginas_Totales,data.Pagina,this.tamPag)
      }
    })
  }

  buscar(pag){
    let tam = this.tamPag;
    console.log(this.Filtros);
    this.url='https://www.aisha.ovh/api/expedientes/search/';
    //Recupero la informacion del lugar de google Maps
    if(this.sitio.gm_accessors_.place.gd.b == true && this.sitio.gm_accessors_.place.gd.l != ''){
      let idLugar = this.sitio.gm_accessors_.place.gd.place.id;
      this.Filtros.Lugar = idLugar;
    }
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
      this.url += '&e='+null;
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
         this.paginacion(data.Paginas_Totales, data.Pagina, this.tamPag);

       }
     }
   });
  }

  changeView(view){
    console.log(view);
    this.view = view;
  }

  borrarExpediente(id){
    console.log('Borrar' + id);
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
  console.log('Paso a la pagina');
  console.log(pag);
  //Tengo que ver si hay busqueda hecha
  if(this.busqueda == true){
    this.buscar(pag);
  }else{
    this._expedientesServices.getExpedientes(pag, this.tamPag).subscribe(data=>{
      if(data.Codigo == 501){
        location.href='/expired';
        return;
      }
      this.expediente = data.Data;
      this.loading = false;
      this.paginacion(data.Paginas_Totales, data.Pagina, this.tamPag);
    })
  }
}

}
