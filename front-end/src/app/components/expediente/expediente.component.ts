import { Component } from '@angular/core';
import { ExpedientesService } from "../../services/expedientes.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html'
})
export class ExpedienteComponent{

  error:boolean = true;
  bloque:number=0;
  selectedTab = 0;


  constructor(private _expedienteService:ExpedientesService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

  }

terminar(){
  sessionStorage.removeItem('IDExp');

}

prueba(){
  // ng-reflect-selected-index="0"
  console.log(document.getElementById("bloqueHeader").querySelector('mat-tab-header'));
  console.log(this.selectedTab);
  this.selectedTab = this.selectedTab+1;;
  //MatDialogRef
}

cambiarColorBl1(){
  document.getElementById("bl1").style.background="white";
  document.getElementById("bl2").style.background="#DBDBDB";
  document.getElementById("bl3").style.background="#DBDBDB";
  document.getElementById("bl4").style.background="#DBDBDB";
  document.getElementById("bl5").style.background="#DBDBDB";
}

cambiarColorBl2(){
  document.getElementById("bl1").style.background="#DBDBDB";
  document.getElementById("bl2").style.background="white";
  document.getElementById("bl3").style.background="#DBDBDB";
  document.getElementById("bl4").style.background="#DBDBDB";
  document.getElementById("bl5").style.background="#DBDBDB";
}

cambiarColorBl3(){
  document.getElementById("bl1").style.background="#DBDBDB";
  document.getElementById("bl2").style.background="#DBDBDB";
  document.getElementById("bl3").style.background="white";
  document.getElementById("bl4").style.background="#DBDBDB";
  document.getElementById("bl5").style.background="#DBDBDB";
}

cambiarColorBl4(){
  document.getElementById("bl1").style.background="#DBDBDB";
  document.getElementById("bl2").style.background="#DBDBDB";
  document.getElementById("bl3").style.background="#DBDBDB";
  document.getElementById("bl4").style.background="white";
  document.getElementById("bl5").style.background="#DBDBDB";
}

cambiarColorBl5(){
  document.getElementById("bl1").style.background="#DBDBDB";
  document.getElementById("bl2").style.background="#DBDBDB";
  document.getElementById("bl3").style.background="#DBDBDB";
  document.getElementById("bl4").style.background="#DBDBDB";
  document.getElementById("bl5").style.background="white";
}



}
