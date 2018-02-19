import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ExpedientesService} from '../../../services/expedientes.service';

@Component({
  selector: 'app-bloque4',
  templateUrl: './bloque4.component.html',
  styleUrls: ['./bloque4.component.css']
})
export class Bloque4Component implements OnInit {

  opciones: Array<{id:number, opcion:string}> = [{id:0, opcion:'N0'},{id:1, opcion:'SI'}];
  tiposMutilacion = new Array();
  consecuenciasSalud = new Array();
  consecuencia = new Array();
  //aqui almaceno las consecuencias seleccionadas
  consecuencias = new Array();
  json = {
    ID_Bolque: '',
    ID_Expediente: 12,//sessionStorage.IDExp,
    Detec_MGF: 0,
    ID_Mutilacion: 0,
    Cicatriz_genital: 0,
    Descripcion: '',
    Elasticidad: '',
    Otros: '',
    Formato_int: '',
    Consejo: ''
  }

  mensaje:string = '';

  constructor(private _expedienteService:ExpedientesService) {
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
        if(this.consecuencia[i+53] == true){
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
        }
    });
    //Despues de guardar, borrar el Array
    this.consecuencias = [];
  }
  ngOnInit() {
  }

}
