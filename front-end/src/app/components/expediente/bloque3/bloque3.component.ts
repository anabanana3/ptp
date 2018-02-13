import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ExpedientesService} from '../../../services/expedientes.service';
//import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-bloque3',
  templateUrl: './bloque3.component.html',
  styleUrls: []
})
export class Bloque3Component implements OnInit {

  opciones: Array<{id:number, opcion:string}> = [{id:0, opcion:'N0'},{id:1, opcion:'SI'}];
  //datos que voy a enviar a la bd
  json = {
    Exp_propias:'',
    Exp_terceros:'',
    Mant_MGF: 0,
    Mant_MGF_texto: '',
    Conoc_consecM: 0,
    Otros_consecM: '',
    Conoc_consecH: 0,
    Otros_consecH: '',
    Formato_int: '',
    Consejo: ''
  }
  mensaje:string = '';

  constructor(private _expedienteService:ExpedientesService) {}
  guardarDatos(forma:NgForm){
    console.log(this.json); //para ver lo que guarda el json
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
  }
  ngOnInit() {}
}
