import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../../services/expedientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-b4',
  templateUrl: './edit-b4.component.html'
})
export class EditB4Component implements OnInit {

  json;
  tiposMutilacion = new Array();
  consecuenciasSalud = new Array();
  consecuencia = new Array();
  form:FormGroup;
  constructor(private router:Router, private _expedientesService: ExpedientesService, private activatedRoute: ActivatedRoute) {
    let id:number;
    activatedRoute.params.subscribe(params=>{
      id = params['id'];
    });
    this._expedientesService.getTipoMutilacion().subscribe(data=>this.tiposMutilacion=data);
    this._expedientesService.getConsecuenciasSalud().subscribe(data =>{
        this.consecuenciasSalud = data;
        console.log(this.consecuenciasSalud);
    });
    this._expedientesService.getBloque4(id).subscribe(data=>{

      console.log(data);
      this.json=data[0];
      //Limpio los fromatos de los campos de texto que vienen de la BD
      if(this.json.Descripcion =="''"){
        this.json.Descripcion = '';
      }else{
        this.json.Descripcion = this.json.Descripcion.split("'")[1];
      }
      if(this.json.Elasticidad == "''"){
        this.json.Elasticidad = '';
      }else{
        this.json.Elasticidad = this.json.Elasticidad.split("'")[1];
      }

      if(this.json.Formato_int == "''"){
        this.json.Formato_int = '';
      }else{
        this.json.Formato_int = this.json.Formato_int.split("'")[1];
      }
      if(this.json.Consejos == "''"){
        this.json.Consejos = '';
      }else{
        this.json.Consejos = this.json.Consejos.split("'")[1];
        console.log(this.json.Consejo)
      }
      if(this.json.Otros == "''"){
        this.json.Otros = '';
      }else{
        this.json.Otros = this.json.Otros.split("'")[1];
      }

      this.form = new FormGroup({
        'Detec_MGF': new FormControl(),
        'Cicatriz_genital': new FormControl()

      })
    })

    this._expedientesService.getTieneConsecSalud(id).subscribe(data=>{
      console.log('***********************************')
      console.log(data);
    })
  }

  ngOnInit() {
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

}
