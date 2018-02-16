import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';

@Component({
  selector: 'app-mis-expedientes',
  templateUrl: './mis-expedientes.component.html',
  styleUrls: ['./mis-expedientes.component.css']
})



export class MisExpedientesComponent implements OnInit {

  expedientes = new Array();
  //Para la paginacion
  paginas = new Array();
  pagNext:number;
  pagBack:number;
  pagActual:number;
  tamPag:number=10;


  constructor(private _expedientesService:ExpedientesService) {
      //Recupero los expedientes del usuario que ha iniciado sesion
      this._expedientesService.getExpedientesUser(1, this.tamPag).subscribe(data =>{
        // console.log(data);
        this.expedientes = data.Data;
        this.paginacion(data.Pagina, data.Paginas_Totales);
        console.log(this.expedientes);
      })
   }

  ngOnInit() {
  }


  getExpedientesUser(pag,tam){
    this._expedientesService.getExpedientesUser(pag, this.tamPag).subscribe(data=>{
      this.expedientes = data.Data;
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
  }

  pasarPagina(pag){

    this.getExpedientesUser(pag, this.tamPag);
    this.pagActual = pag;
  }

}
