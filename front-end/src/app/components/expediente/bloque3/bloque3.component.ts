import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ExpedientesService} from '../../../services/expedientes.service';
import {ExpedienteComponent} from '../expediente.component';
//import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-bloque3',
  templateUrl: './bloque3.component.html',
  styleUrls: []
})
export class Bloque3Component implements OnInit {

  opciones: Array<{id:number, opcion:string}> = [{id:0, opcion:'No'},{id:1, opcion:'Si'}];
  //datos que voy a enviar a la bd
  json = {
    ID_Expediente: sessionStorage.IDExp,//sessionStorage.IDExp,
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

  constructor(private _expedienteService:ExpedientesService, private expedienteComponent:ExpedienteComponent) {}

  guardarDatos(forma:NgForm){
    console.log(this.json); //para ver lo que guarda el json
    if(forma.valid === false){
      this.mensaje = 'Completa todos los campos obligatorios';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }else{
      this._expedienteService.addBloque3(this.json).subscribe(data =>{ console.log(data);
        if(data.warningCount == 0){
          //      this.expedienteComponent.bloque = 4;
          this.cambiarBloque();
          // this.mensaje = 'Guardado correctamente!';
          // document.getElementById('alert').className = 'alert alert-success';
        }
      });
    }
  }
  cambiarBloque(){
     this.expedienteComponent.selectedTab = 3;
  }
  ngOnInit() {}
}
