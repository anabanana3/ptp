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
  bloque1:boolean = false;
  bloque2:boolean = true;
  bloque3:boolean = true;
  bloque4:boolean = true;
  bloque5:boolean = true;



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

bloquearPestanya(numero){
  console.log('Bloqueo la pestanya del bloque ', numero);
  switch(numero){
    case 1:
      this.bloque1 = true;
    break;
    case 2:
      this.bloque2 = true;
    break;
    case 3:
      this.bloque3 = true;
    break;
    case 4:
      this.bloque4 = true;
    break;
    case 5:
      this.bloque5 = true;
    break;
  }
}

desbloquearPestaña(numero){
  console.log('Desbloque la pestanya del bloque ', numero);
  switch(numero){
    case 1:
      this.bloque1 = false;
    break;
    case 2:
      this.bloque2 = false;
    break;
    case 3:
      this.bloque3 = false;
    break;
    case 4:
      this.bloque4 = false;
    break;
    case 5:
      this.bloque5 = false;
    break;
  }
}
}
