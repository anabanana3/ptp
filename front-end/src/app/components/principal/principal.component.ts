import { Component, OnInit } from '@angular/core';

import { NoticiasService } from "../../services/noticias.service";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent implements OnInit {
  slideIndex:number = 1;
  photos = new Array();
  n:number = 0;
  i:number = 0;
  k:number = 0;
  parafecha:string = '';
  id:number = 0;
  arrayIds = new Array();

  slideIndexAuto:number = 0;

  logueado:boolean = false;
  admin:boolean = false;
  asociacion:boolean = false;
  constructor(private _noticiasService:NoticiasService) {

    if(sessionStorage.length !== 0){
      this.logueado = true;

      if(sessionStorage.getItem('iD') == '44'){
        this.admin = true;
      }
      if(sessionStorage.getItem('asociacion') != null){
        this.asociacion = true;
      }
    }
   }

  ngOnInit() {
  }

}
