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
    Mant_MGF: 2,
    Mant_MGF_texto: '',
    Conoc_consecM:2,
    Otros_consecM: '',
    Conoc_consecH: 2,
    Otros_consecH: '',
    Formato_int: '',
    Consejo: ''
  }
  mensaje:string = '';

  constructor(private _expedienteService:ExpedientesService, private expedienteComponent:ExpedienteComponent) {}

  guardarDatos(){
    console.log(this.json); //para ver lo que guarda el json
    // if(forma.valid === false){
    //   this.mensaje = 'Completa todos los campos obligatorios';
    //   document.getElementById('alert').className = 'alert alert-danger';
    //   return;
    // }else{
      this.json.ID_Expediente = sessionStorage.IDExp;
      this._expedienteService.updateBloque3(this.json).subscribe(data =>{ console.log(data);
        if(data.Codigo == 501){
          location.href ='/expired';
        }else{
          if(data.warningCount == 0){
            //      this.expedienteComponent.bloque = 4;
            this.cambiarBloque();
            // this.mensaje = 'Guardado correctamente!';
            // document.getElementById('alert').className = 'alert alert-success';
          }
        }
      });
    //}
  }
  guardarDatos2(form){
    //this.cambiarBloque();
    console.log(this.json);
  }
  cambiarBloque(){
     this.expedienteComponent.selectedTab = 3;
    //  this.expedienteComponent.bloquearPestanya(3);
    //  this.expedienteComponent.desbloquearPestaña(4);
  }

  terminar(){
    //Borro todos los campos auxiliares que tiene el formulario de expedientes
    sessionStorage.removeItem('IDExp');
    sessionStorage.removeItem('IDPer');
    sessionStorage.removeItem('bloque1');
    sessionStorage.removeItem('bloque2');
    sessionStorage.removeItem('bloque3');
    sessionStorage.removeItem('bloque4');
    sessionStorage.removeItem('bloque5');
    location.href = '/home';
  }

  ngOnInit() {}
}
