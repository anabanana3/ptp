import { Component, OnInit } from '@angular/core';
import { ExpedientesService} from '../../../services/expedientes.service';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
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
  partos = new Array(0);
  //totalPartos = new Array(this.numPartos);
  hayParto:boolean = false;
  html:string;
  form:FormGroup;



//Campos del bloque2
bloque2={
  ID_Bloque:'',
  ID_Expediente:sessionStorage.idExp,
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


  constructor(private _expedienteService:ExpedientesService) {

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
          this._expedienteService.addParto(this.datosPartos[i]).subscribe(data=>{
            console.log(data);
          })
        }
      }

    });



  }
  prueba(n){
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
    console.log(this.datosPartos);
    console.log(this.datosPartos[1].Edad_Madre);
    console.log(this.datosPartos[1].CompMadre);
    // //Inicializo el array de partos
    // for(let i=0; i<n; i++){
    //   this.datosParto[i]=this.parto;
    // }
    // console.log(this.datosParto);
}
}
class Parto{
   ID_Expediente:number=sessionStorage.idExp;
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
