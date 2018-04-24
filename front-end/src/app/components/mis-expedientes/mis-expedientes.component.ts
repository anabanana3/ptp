import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';
import { CarpetasService } from '../../services/carpetas.service';


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
  //Variable para mostrar expedientes publicos, privados o ambos => 1:privados, 2:publicos, 3:ambos
  tipoExp:number=1;
  tiposMGF = new Array();
    Filtros ={
    Titulo:'',
    Fecha1:'',
    Fecha2:'',
    Lugar:'',
    Etnia:0,
    TipoMGF:0,
  }

  carpetas = new Array();


  constructor(private _expedientesService:ExpedientesService, private _carpetaService:CarpetasService) {
    if(sessionStorage.length == 0){
      return;
    }else{
      this.error = false;
      //Recupero las etnias para añadirlas al menu de busqueda
      this._expedientesService.getEtnias().subscribe(data=>this.etnias = data);
      this._expedientesService.getTipoMutilacion().subscribe(data=>this.tiposMGF = data);
      //Recupero los expedientes del usuario que ha iniciado sesion
      this.getExpedientesUser(1,1,this.tamPag);
      this._expedientesService.getExpedientesPrivUser(1, this.tamPag).subscribe(data =>{
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          console.log(data);
          this.expedientes = data.Data;
          this.paginacion(data.Pagina, data.Paginas_Totales);
          //console.log(this.expedientes);
          document.getElementById("priv").style.fontWeight = "bold";
          console.log(this.expedientes);

          //TODO: Obtengo las carpetas que tiene el usuario
          this.getCarpetasUser(sessionStorage.iD);
        }
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
      this.tipoExp = 1;
      //TODO: Faltan estos metodos
      document.getElementById("priv").style.fontWeight = "bold";
      document.getElementById("publ").style.fontWeight = "normal";
      document.getElementById("todos").style.fontWeight = "normal";
      this.getExpedientesUser(this.tipoExp,1, this.tamPag)
    break;
    case 2:
      console.log("Expedientes Publicos");
      this.tipoExp = 2;
      //TODO: Faltan estos metodos
      document.getElementById("priv").style.fontWeight = "normal";
      document.getElementById("publ").style.fontWeight = "bold";
      document.getElementById("todos").style.fontWeight = "normal";
      this.getExpedientesUser(this.tipoExp,1, this.tamPag)
    break;
    case 3:
      this.tipoExp = 3;
      console.log('Todos los expedientes');
      document.getElementById("priv").style.fontWeight = "normal";
      document.getElementById("publ").style.fontWeight = "normal";
      document.getElementById("todos").style.fontWeight = "bold";
      this.getExpedientesUser(this.tipoExp,1, this.tamPag)
    break;
  }
}


getExpedientesUser(tipo,pag, tam){
  switch (tipo){
    case 1:
    this._expedientesService.getExpedientesPrivUser(pag, tam).subscribe(data =>{
      if(data.Resultado == 'OK'){
          this.expedientes = new Array();
          this.mensaje = 'No tienes almacenado ningún expediente privado';
          document.getElementById('alert').className = 'alert alert-danger';
      }else{
        if(data.Codigo == 501){
          location.href ='/expired';
        }else{
          this.expedientes = data.Data;
          console.log('Resultado de la funcion aux privados');
          console.log(data);
          this.paginacion(data.Pagina, data.Paginas_Totales);
        }
      }
      });
    break;
    case 2:
      //Los publicos
      this._expedientesService.getExpedientesPubUser(pag,tam).subscribe(data=>{
        if(data.Resultado == 'OK'){
          this.expedientes = new Array();
          console.log('Todavia no tienes alamcenado nada publico');
          this.mensaje = 'No tienes expediente públicos';
          document.getElementById('alert').className = 'alert alert-danger';
        }else{
          if(data.Codigo == 501){
            location.href = '/expired';
          }else{
            this.expedientes = data.Data;
            console.log('Resultado de la funcion aux publicos');
            console.log(data);
            this.paginacion(data.Pagina, data.Paginas_Totales);
          }
        }
      })
    break;
    case 3:
      //Todos
      this._expedientesService.getExpedientesUser(pag, tam).subscribe(data=>{
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          this.expedientes = data.Data;
          console.log('Resultado de la funcion aux ambos');
          console.log(data);
          this.paginacion(data.Pagina, data.Paginas_Totales);
        }
      })

    break;
  }

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
         if(data.Codigo == 501){
           location.href = '/expired';
         }else{
           console.log('Hay busqueda');
           this.busqueda = true;
           this.expedientes = data.Data;
           this.mensaje = '';
           this.paginacion(data.Pagina, data.Paginas_Totales);
         }
        }
     });
  }
  buscar2(pag, tamPag=this.tamPag){
    console.log(this.Filtros);
    console.log(this.tipoExp);
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
      this.getExpedientesUser(this.tipoExp,pag, this.tamPag);
      this.pagActual = pag;
    }else{
      console.log('Hay busqueda. Como paso la pagina de la busqueda');
      this.buscar(pag);
    }
  }

//GESTION DE LA CARPETAS
  getCarpetasUser(idU){
    this._carpetaService.getCarpetasUser(idU, this.tamPag, 1).subscribe(data =>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }
      console.log(data);
      this.carpetas = data.Data;
      console.log(this.carpetas);
      console.log(this.carpetas.length);
    })
  }
  nuevaCarpeta(nombre){
    //TODO => Abrir un PopUp para crear la carpeta con el nombre que queramos
    console.log(nombre);
    this._carpetaService.newCarpeta(nombre).subscribe(data =>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }
      console.log(data);
    })


  }

}
