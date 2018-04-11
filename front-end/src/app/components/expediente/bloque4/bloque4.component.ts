import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ExpedientesService} from '../../../services/expedientes.service';
import {ExpedienteComponent} from '../expediente.component';


@Component({
  selector: 'app-bloque4',
  templateUrl: './bloque4.component.html',
  styleUrls: ['./bloque4.component.css']
})
export class Bloque4Component implements OnInit {

  opciones: Array<{id:number, opcion:string}> = [{id:0, opcion:'No'},{id:1, opcion:'Si'}];
  tiposMutilacion = new Array();
  consecuenciasSalud = new Array();
  consecuencia = new Array();
  //aqui almaceno las consecuencias seleccionadas
  consecuencias = new Array();
  json = {
    //ID_Bloque: '',
    ID_Expediente: sessionStorage.IDExp,//sessionStorage.IDExp,
    Detec_MGF: 0,
    ID_Mutilacion: 0,
    Cicatriz_genital: 0,
    Descripcion: '',
    Elasticidad: '',
    Otros: '',
    Formato_int: '',
    Consejos: ''
  }

  mensaje:string = '';

  constructor(private _expedienteService:ExpedientesService, private expedienteComponent:ExpedienteComponent) {
    this._expedienteService.getTipoMutilacion().subscribe(data => this.tiposMutilacion = data);
    this._expedienteService.getConsecuenciasSalud().subscribe(data => this.consecuenciasSalud = data);
  }
  //guardo los id
  loadConsecuencias(id){
    if(this.consecuencia.length > 0){
      for(var i=0; i< this.consecuenciasSalud.length; i++){
        if(this.consecuencia[i] == true){
          console.log(this.consecuencias);
          this.consecuencias.push(id);
        }else{
          this.consecuencias.splice(id,1);
        }
      }
    }
  }

  mostrarConsec_fisicas(){
    document.getElementById("iconPlus").style.display="none";
    document.getElementById("iconMinus").style.display="block";
    document.getElementById("consFisInm").style.display="block";
  }

  ocultarConsec_fisicas(){
    document.getElementById("iconMinus").style.display="none";
    document.getElementById("iconPlus").style.display="block";
    document.getElementById("consFisInm").style.display="none";
  }

  mostrarConsec_LP(){
    document.getElementById("iconPlusLP").style.display="none";
    document.getElementById("iconMinusLP").style.display="block";
    document.getElementById("consFisLP").style.display="block";
  }

  ocultarConsec_LP(){
    document.getElementById("iconMinusLP").style.display="none";
    document.getElementById("iconPlusLP").style.display="block";
    document.getElementById("consFisLP").style.display="none";
  }

  mostrarConsec_Obs(){
    document.getElementById("iconPlusObs").style.display="none";
    document.getElementById("iconMinusObs").style.display="block";
    document.getElementById("consObs").style.display="block";
  }

  ocultarConsec_Obs(){
    document.getElementById("iconMinusObs").style.display="none";
    document.getElementById("iconPlusObs").style.display="block";
    document.getElementById("consObs").style.display="none";
  }

  mostrarConsec_Psico(){
    document.getElementById("iconPlusPsico").style.display="none";
    document.getElementById("iconMinusPsico").style.display="block";
    document.getElementById("consPsico").style.display="block";
  }

  ocultarConsec_Psico(){
    document.getElementById("iconMinusPsico").style.display="none";
    document.getElementById("iconPlusPsico").style.display="block";
    document.getElementById("consPsico").style.display="none";
  }

  mostrarConsec_Sex(){
    document.getElementById("iconPlusSex").style.display="none";
    document.getElementById("iconMinusSex").style.display="block";
    document.getElementById("consSex").style.display="block";
  }

  ocultarConsec_Sex(){
    document.getElementById("iconMinusSex").style.display="none";
    document.getElementById("iconPlusSex").style.display="block";
    document.getElementById("consSex").style.display="none";
  }

  guardarDatos(forma:NgForm){
    console.log(this.json); //para ver lo que guarda el json
    console.log(this.consecuencias);
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
    if(this.consecuencia.length > 0){
      console.log("entro"+ this.consecuenciasSalud.length);
      for(var i=1; i< this.consecuenciasSalud.length+1; i++){
        if(this.consecuencia[i] == true){
          console.log("entro"+ this.consecuencias[i]);
          this.consecuencias.push(i);
          console.log(this.consecuencias);
        }
      }
    }
    this._expedienteService.addBloque4(this.json).subscribe(data =>{
      console.log(data);
      let bloque = data.insertId;
      this._expedienteService.addConsecuenciasSalud(this.json.ID_Expediente, bloque, this.consecuencias).subscribe(data => {
        console.log(data);
      });
        if(data.warningCount == 0){

          this.mensaje = 'Guardado correctamente!';
          document.getElementById('alert').className = 'alert alert-success';
          //Despues de guardar, borrar el Array
          this.consecuencias = [];
          this.cambiarBloque();
          //this.expedienteComponent.bloque = 5;
        }
    });

  }
  cambiarBloque(){
     this.expedienteComponent.selectedTab = 4;
  }

  ngOnInit() {
  }

}
