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

//Variables para filtar los expedientes
  n:number = 3;
  filtro:number=1;


  constructor(private _expedientesService:ExpedientesService) {
    if(sessionStorage.length == 0){
      return;
    }else{
      this.error = false;
    }
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

  ngOnInit() {
  }

cambio(n){
  this.n = n;
  this.getExpedientesUser(1, 10);
}

  getExpedientesUser(pag,tam){
    switch(this.n){
      case 1:
        console.log("Expedientes Privados");
        //TODO: Faltan estos metodos
        document.getElementById("priv").style.fontWeight = "bold";
        document.getElementById("publ").style.fontWeight = "normal";
        document.getElementById("todos").style.fontWeight = "normal";
        this._expedientesService.getExpedientesPrivUser(pag, this.tamPag).subscribe(data=>{
          this.expedientes = data.Data;
        });
      break;
      case 2:
        console.log("Expedientes Publicos");
        this.expedientes = new Array(0);
        //TODO: Faltan estos metodos
        document.getElementById("priv").style.fontWeight = "normal";
        document.getElementById("publ").style.fontWeight = "bold";
        document.getElementById("todos").style.fontWeight = "normal";
      break;
      case 3:
        document.getElementById("priv").style.fontWeight = "normal";
        document.getElementById("publ").style.fontWeight = "normal";
        document.getElementById("todos").style.fontWeight = "bold";
      break;
    }

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

    this.getExpedientesUser(pag, this.tamPag);
    this.pagActual = pag;
  }

}
