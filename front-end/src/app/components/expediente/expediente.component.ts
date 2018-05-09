import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Persona } from '../../interfaces/persona';
import { Expedinete } from '../../interfaces/expediente';
import { ExpedientesService } from "../../services/expedientes.service";

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html'
})
export class ExpedienteComponent{

  error:boolean = true;
  bloque:number=0;
  selectedTab = 0;
  // bloque1:boolean = false;
  // bloque2:boolean = true;
  // bloque3:boolean = true;
  // bloque4:boolean = true;
  // bloque5:boolean = true;
  asociacion:boolean = false;
  admin:boolean = false;
  usuario:boolean = false;

  //Datos por defecto del Expediente
  expediente:Expedinete ={
    Titulo:'',
    ID_Expediente:null,
    Fecha:null,
    Descripcion:'',
    ID_Persona:null,
    ID_Lugar:0,
    ID_Usuario:parseInt(sessionStorage.iD)

  };

  menor:Persona = {
    ID_Persona:null,
    Nombre:'',
    Edad:0,
    ID_Sexo:1,
    ID_Etnia:164,
    ID_Lugar:0,
    ID_Actividad:27

  };

  bloque1:any = {
    ID_Expediente:'',
    Citacion:2,
    Deriv_Riesgo:2,
    Deriv_Sospecha:2,
    Otros:'',
    Acomp_P:2,
    Acomp_M:2,
    Acomp_H:2,
    Acomp_O:'',
    Dif_Idi_M:2,
    Traduccion:2,
    Mediacion:2,
    Curso:'No empleado',
    Centro_Salud:'No empleado'
  };

  bloque2={
    ID_Bloque:'',
    ID_Expediente:null,
    Conoce_MGF:2,
    MGF_realizada_com_origen:2,
    Pos_madre:2,
    Pos_padre:2,
    Pos_familia:2,
    Otros:'',
    Significado_MGF:'',
    Formato_intervencion:'',
    Consejos:'',
    Sintomas_MGF:'',
    Num_Partos:0,
  }

  bloque3 = {
    ID_Expediente: null,
    Exp_propias:'',
    Exp_terceros:'',
    Mant_MGF: 2,
    Mant_MGF_texto: '',
    Conoc_consecM:2,
    Otros_consecM: '',
    Conoc_consecH: 2,
    Otros_consecH: '',
    Formato_int: '',
    Consejo: ''
  }
  bloque4 = {
    //ID_Bloque: '',
    ID_Expediente:null,
    Detec_MGF: 2,
    ID_Mutilacion: 5,
    Cicatriz_genital: 2,
    Descripcion: '',
    Elasticidad: '',
    Otros: '',
    Formato_int: '',
    Consejos: ''
  }

  bloque5={
    ID_Expediente:null,
    Viajes:2,
    ViajesPlanifiacados: 2,
    Intervencion:'',
    Consejos: '',
  }

  constructor(private _expedienteService:ExpedientesService) {
    console.log('Constructor del Expedinete controller');
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }else if(sessionStorage.getItem('usuario') != null){
      this.usuario = true;
    }else if(sessionStorage.getItem('admin') != null){
      this.admin = true;
    }

   this.createExpDefault();

  }

terminar(){
  sessionStorage.removeItem('IDExp');

}

createExpDefault(){
  //  Creo la persona
this._expedienteService.addPersona(this.menor).subscribe(data =>{
 if(data.Codigo == 501){
   location.href = '/expired';
   return;
 }
 //Obtengo el id de la persona que acabamos de crear
 let idP = data.insertId;
 sessionStorage.IDExp = idP
 this.menor.ID_Persona = idP;
 this.expediente.ID_Persona=idP;//Asigo ese id al expediente
 //Creo el expediente vacio
 this._expedienteService.addExpediente(this.expediente).subscribe(data => {
   let IDExp = data.insertId;
   this.expediente.ID_Expediente = IDExp;
   console.log('Guardo el ID del expediente en la sessionStorage');
   sessionStorage.IDExp = IDExp
   //Asigno el ID_Expediente a todos los bloques que voy a crear
   this.bloque1.ID_Expediente = IDExp;
   this.bloque2.ID_Expediente = IDExp;
   this.bloque3.ID_Expediente = IDExp;
   this.bloque4.ID_Expediente = IDExp;
   this.bloque5.ID_Expediente = IDExp;
   console.log(sessionStorage);
   //Creo el bloque 1 => Y guardo el su id en la sessionStorage para despues
   this._expedienteService.addBloque(this.bloque1, data.insertId).subscribe(data => {
     console.log('Compruebo que se ha creado Correctamente');
     console.log(data);
     sessionStorage.bloque1 = data.insertId;
     //Creo el bloque 2 => guardo su id
     this._expedienteService.addBloque2(this.bloque2).subscribe(data=>{
       sessionStorage.bloque2 = data.insertId;
       console.log(data);
       //Creo el bloque 3 por defecto => guardo su id
       this._expedienteService.addBloque3(this.bloque3).subscribe(data=>{
         sessionStorage.bloque3 = data.insertId;
          //Creo el bloque 4
            this._expedienteService.addBloque4(this.bloque4).subscribe(data=>{
              sessionStorage.bloque4 = data.insertId;
              //Creo el ultimo bloque
              this._expedienteService.addbloque5(this.bloque5).subscribe(data=>{
                sessionStorage.bloque5=data.insertId;
                console.log('Bloque 5 creado correctamente');
              });
            });
          });
        });
      });
    });
  });
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

// bloquearPestanya(numero){
//   console.log('Bloqueo la pestanya del bloque ', numero);
//   switch(numero){
//     case 1:
//       this.bloque1 = true;
//     break;
//     case 2:
//       this.bloque2 = true;
//     break;
//     case 3:
//       this.bloque3 = true;
//     break;
//     case 4:
//       this.bloque4 = true;
//     break;
//     case 5:
//       this.bloque5 = true;
//     break;
//   }
// }
//
// desbloquearPestaña(numero){
//   console.log('Desbloque la pestanya del bloque ', numero);
//   switch(numero){
//     case 1:
//       this.bloque1 = false;
//     break;
//     case 2:
//       this.bloque2 = false;
//     break;
//     case 3:
//       this.bloque3 = false;
//     break;
//     case 4:
//       this.bloque4 = false;
//     break;
//     case 5:
//       this.bloque5 = false;
//     break;
//   }
// }
}
