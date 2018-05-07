import { Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-politica-privacidad',
  templateUrl: './politica-privacidad.component.html',
})
export class PoliticaPrivacidadComponent {

  asociacion:boolean = false;
  admin:boolean = false;
  usuario:boolean = false;
  noRegistrado:boolean = false;

  constructor() {
    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }else if(sessionStorage.getItem('usuario') != null){
      this.usuario = true;
    }else if(sessionStorage.getItem('admin') != null){
      this.admin = true;
    }else{
      this.noRegistrado = true;
    }
  }

}
