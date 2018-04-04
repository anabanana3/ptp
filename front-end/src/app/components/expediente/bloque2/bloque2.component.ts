import { Component, OnInit, Inject } from '@angular/core';
import { ExpedientesService} from '../../../services/expedientes.service';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {ExpedienteComponent} from '../expediente.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { Parto } from '../../../interfaces/parto';

@Component({
  selector: 'app-bloque2',
  templateUrl: './bloque2.component.html',
  styleUrls: []
})



export class Bloque2Component implements OnInit {
  opciones = ["No", 'Si'];
  opciones2 =["A favor", "En contra"];
  numPartos:number = 0;
  formulas = new Array();
  tiposMutilacion = new Array();
  compNacido = new Array();
  compMadre = new Array();
  //Array para almacenar las opciones selecionadas
  compMadreSel = new Array();
  compNacidoSel = new Array();
  partos = new Array(0);
  //totalPartos = new Array(this.numPartos);
  hayParto:boolean = false;
  html:string;
  form:FormGroup;

//Prueba de git

//Campos del bloque2
bloque2={
  ID_Bloque:'',
  ID_Expediente:sessionStorage.IDExp,
  Conoce_MGF:0,
  MGF_realizada_com_origen:0,
  Pos_madre:0,
  Pos_padre:0,
  Pos_familia:0,
  Otros:'',
  Significado_MGF:'',
  Formato_intervencion:'',
  Consejos:'',
  Sintomas_MGF:'',
  Num_Partos:0,
}
datosPartos = new Array();

  // parto:Parto={
  //   Edad_Madre:0,
  //   Fecha:null,
  //   Edad_Nacido:0,
  //   Tiempo_Expulsivo:0,
  //   Tiempo_Dilatacion:0,
  //   Duracion_Parto:0,
  //   ID_Formula:0,
  //   Test_APGAR:0,
  //   ID_Tipo:0,
  //   ID_Mutilacion:0,
  //   CompMadre:null,
  //   compNacido:null
  // };
  // datosParto:Parto[];

  constructor(private _expedienteService:ExpedientesService,
    private expedienteComponent:ExpedienteComponent, public dialog: MatDialog) {
      console.log(sessionStorage.IDExp)
      console.log(this.bloque2.ID_Expediente);
    this._expedienteService.getFormulasObstreticas().subscribe(data=>{
      console.log('Muestro la data',data);
      this.formulas = data;
    });
    this._expedienteService.getTipoMutilacion().subscribe(data => this.tiposMutilacion = data);
    this._expedienteService.getCompMadre().subscribe(data => this.compMadre = data);
    this._expedienteService.getCompNacido().subscribe(data => this.compNacido = data);



   }



  ngOnInit() {
  }
  // TODO: falta añadoir las complicacioes de la madre y del recien nacido
  guardarDatos(form){
    console.log('Se viene marronazo');
    console.log(this.bloque2);
    console.log(this.datosPartos);
    this.bloque2.ID_Expediente = sessionStorage.IDExp;
    //Ya tengo todos los datos que hacen falta
    //Pasos => Crear Bloque => crear Parto => Asociar el Parto al bloque2 (de uno en uno)
    this._expedienteService.addBloque2(this.bloque2).subscribe(data=>{
      console.log(data);
      let bloque = data.insertId;
      //Ver si existen los partos
      if(this.datosPartos.length >0){
        //Creo los partos
        for(let i=0; i<this.datosPartos.length; i++){
          this.datosPartos[i].Id_Bloque= bloque;
          console.log(this.datosPartos[i]);
          this._expedienteService.addParto(this.datosPartos[i]).subscribe(data=>{
            console.log(data);
            let idParto = data.ID_Parto;
            console.log('Muestro el id del parto que acabo de crear');
            console.log(idParto);
            //Una vez creo el parto añado las complicaciones del nacido y del madre que ha selecionado el usuario
            //Miro si ha selecionado alguna complicacion
            if(this.datosPartos[i].CompMadre.length>0){
              this.getCompMadreSel(i);
              // TODO: Implementar las funciones del ExpedientesService
              console.log('Muestro el id del parto que voy a mandar');
              console.log(idParto);
              this._expedienteService.addCompMadreParto(idParto, this.compMadreSel).subscribe(data=>{
                console.log('Info sobre las complicaciones de la madre');
                console.log(data);
              });
            }
            //Miro si se ha selecionado alguna complicacion
            if(this.datosPartos[i].compNacido.length>0){
              this.getCompNacidoSel(i);
              this._expedienteService.addCompNacidoParto(idParto, this.compNacidoSel).subscribe(data=>{
                console.log('Info sobre las complicaciones del nacido');
                console.log(data);
                //Cambio el bloque
                this.cambiarBloque();
                // this.expedienteComponent.bloque = 3;
              })
            }
          })
        }
      }

    });



  }
//Metodo para hacer pruebas con las complicaciones
  guardarDatos2(){
    console.log(this.datosPartos[0].CompMadre);

    for(let i=0; i<this.datosPartos[0].CompMadre.length; i++){
      if(this.datosPartos[0].CompMadre[i] == true){
        this.compMadreSel.push(i+1);
      }
    }
    console.log('Mustro el array auxiliar para guardar los selecionados');
    console.log(this.compMadreSel);
  }

//Funcion para obtener las complicaciones de la madre que ha selecionado el usuario
  getCompMadreSel(n){
    for(let i=0; i<this.datosPartos[n].CompMadre.length; i++){
      if(this.datosPartos[n].CompMadre[i] == true){
        this.compMadreSel.push(i+1);
      }
    }
  }

  //Funcion para obtener las complicaciones del recien nacido que seleciona el usuario
  getCompNacidoSel(n){
    for(let i=0; i<this.datosPartos[n].compNacido.length; i++){
      if(this.datosPartos[n].compNacido[i] == true){
        this.compNacidoSel.push(i+1);
      }
    }
  }
  prueba(n){
    if(n>0){
      console.log('Funcion de prueba de ocntenido');
      console.log(this.numPartos);
      this.bloque2.Num_Partos = n;
      this.partos = new Array(n);
      for(let i=0; i<n-1; i++){
        this.partos.push(i);
      }
      //Prueba de inicializar el array de partos
      for(let i=0; i<n; i++){
        this.datosPartos.push(new Parto());
      }
    }
}
cambiarBloque(){

   this.expedienteComponent.selectedTab = 2;
}

openDialog(nPartos): void {
  console.log(nPartos);
  this.prueba(nPartos);
  console.log(this.datosPartos);
  let dialogRef = this.dialog.open(Popup2, {
    width: '1000px',
    //data: { partos: this.partos, auxM: this.auxM, auxN: this.auxN }
    data:{Npartos: nPartos, pagina: 0, datosPartos: this.datosPartos, compNacido: this.compNacido, compMadre: this.compMadre, formulas: this.formulas, tiposMutilacion: this.tiposMutilacion}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(this.datosPartos);
    //this.animal = result;
  });
}
}
@Component({
  selector: 'popup',
  templateUrl: 'popup.component.html',

})
export class Popup2 {
  hayAlgo:boolean = false;
  variableka:number = 17;

  constructor(
    public dialogRef: MatDialogRef<Popup2>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();

  }

  aumentarVar(){
    console.log("entro en aumentarVar()");
    console.log("variableka: "+ this.variableka);
    this.variableka = this.variableka + 1;
    console.log("ahora variableka: " + this.variableka);
  }

  mostrarPartoMadre(){
    console.log("mostrarPartoMadre");
    document.getElementById("iconPlus").style.display="none";
    document.getElementById("iconMinus").style.display="block";
    document.getElementById("complMadreContainer").style.display="block";
  }

  ocultarPartoMadre(){
    console.log("ocultarPartoMadre");
    document.getElementById("iconMinus").style.display="none";
    document.getElementById("iconPlus").style.display="block";
    document.getElementById("complMadreContainer").style.display="none";
  }

  mostrarNinio(){
    console.log("mostrarPartoMadre");
    document.getElementById("iconPlusN").style.display="none";
    document.getElementById("iconMinusN").style.display="block";
    document.getElementById("complNinioContainer").style.display="block";
  }

  ocultarNinio(){
    console.log("ocultarPartoMadre");
    document.getElementById("iconMinusN").style.display="none";
    document.getElementById("iconPlusN").style.display="block";
    document.getElementById("complNinioContainer").style.display="none";
  }



}

class Parto{
   ID_Expediente:number=sessionStorage.IDExp;
   Id_Bloque:number;
   Edad_Madre:number;
   Fecha:Date=null;
   Edad_Nacido:number;
   Tiempo_Expulsivo:number;
   Tiempo_Dilatacion:number;
   Duracion_Parto:number;
   ID_Formula:number;
   Test_APGAR:number;
   ID_Tipo:number=1;
   ID_Mutilacion:number;
   CompMadre:number[];
   compNacido:number[];



   constructor(){
     this.CompMadre = new Array();
     this.compNacido = new Array();
   }




 }
