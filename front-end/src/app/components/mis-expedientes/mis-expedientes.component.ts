import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';

@Component({
  selector: 'app-mis-expedientes',
  templateUrl: './mis-expedientes.component.html',
  styleUrls: ['./mis-expedientes.component.css']
})

// TODO: Recoger todos los expedientes de un usuario no solo los provados y luego hacer un boton para obtener publicos/privados

export class MisExpedientesComponent implements OnInit {

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
  n:number = 1;
  tiposMGF = new Array();
  filtro:number=1;
  Filtros ={
    Titulo:'',
    Fecha1:'',
    Fecha2:'',
    Lugar:'',
    Etnia:0,
    TipoMGF:0,
    Orden:this.filtro
  }


  constructor(private _expedientesService:ExpedientesService) {
    if(sessionStorage.length == 0){
      return;
    }else{
      this.error = false;
      //Recupero las etnias para añadirlas al menu de busqueda
      this._expedientesService.getEtnias().subscribe(data=>this.etnias = data);
      this._expedientesService.getTipoMutilacion().subscribe(data=>this.tiposMGF = data);
      //Recupero los expedientes del usuario que ha iniciado sesion
      this._expedientesService.getExpedientesPrivUser(1, this.tamPag).subscribe(data =>{
        console.log(data);
        this.expedientes = data.Data;
        this.paginacion(data.Pagina, data.Paginas_Totales);
        //console.log(this.expedientes);
        document.getElementById("fecha").style.fontWeight = "bold";
        document.getElementById("priv").style.fontWeight = "bold";
        console.log(this.expedientes);
      });
    }
   }

  ngOnInit() {
  }

// TODO: Funcion para cargar los expedientes privados, publicos o ambos
cambio(n){
  this.n = n;
  switch(this.n){
    case 1:
      console.log("Expedientes Privados");
      //TODO: Faltan estos metodos
      document.getElementById("priv").style.fontWeight = "bold";
      document.getElementById("publ").style.fontWeight = "normal";
      document.getElementById("todos").style.fontWeight = "normal";
    break;
    case 2:
      console.log("Expedientes Publicos");
      //TODO: Faltan estos metodos
      document.getElementById("priv").style.fontWeight = "normal";
      document.getElementById("publ").style.fontWeight = "bold";
      document.getElementById("todos").style.fontWeight = "normal";
    break;
    case 3:
      console.log('Todos los expedientes');
      document.getElementById("priv").style.fontWeight = "normal";
      document.getElementById("publ").style.fontWeight = "normal";
      document.getElementById("todos").style.fontWeight = "bold";
    break;
  }
}


getExpedientesUser(pag, tam){
  this._expedientesService.getExpedientesPrivUser(pag, tam).subscribe(data =>{
    this.expedientes = data.Data;
    this.paginacion(data.Pagina, data.Paginas_Totales);
    });
}


  buscar(pag, tamPag=this.tamPag){
    console.log(this.Filtros);
    console.log('Muestro el estado de la url antes de pillar los datos');
    console.log(this.url);
      this.url='https://www.aisha.ovh/api/privados/'+sessionStorage.iD+'/search/';
      let primero = 1;
      if(this.Filtros.Titulo != ''){
        //No son nulos => los pongo tal cual
        this.url += 'titulo='+this.Filtros.Titulo;
      }else{
        this.url += 'titulo='+null;
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
     this.url += '/pag='+pag+'&n='+tamPag;

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
         console.log('Hay busqueda');
         this.busqueda = true;
         this.expedientes = data.Data;
         this.mensaje = '';
         this.paginacion(data.Pagina, data.Paginas_Totales);
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

    if(this.busqueda == false){
      console.log('No se ha buscado nada');
      this.getExpedientesUser(pag, this.tamPag);
      this.pagActual = pag;
    }else{
      console.log('Hay busqueda. Como paso la pagina de la busqueda');
      this.buscar(pag);
    }
  }

}
