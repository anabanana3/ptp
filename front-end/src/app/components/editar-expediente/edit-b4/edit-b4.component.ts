import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../../services/expedientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-b4',
  templateUrl: './edit-b4.component.html'
})
export class EditB4Component implements OnInit {

  json = {
    ID_Bloque: '',
    ID_Expediente: '',
    Detec_MGF: 2,
    ID_Mutilacion: 5,
    Cicatriz_genital: 2,
    Descripcion: '',
    Elasticidad: '',
    Otros: '',
    Formato_int: '',
    Consejos: ''
  }
  tiposMutilacion = new Array();
  consecuenciasSalud = new Array();
  consecuencia = new Array();
  form:FormGroup;
  consecBD;
  consecuencias = new Array();

  cSel = new Array();

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
        console.log(this.json.Consejos)
      }
      if(this.json.Otros == "''"){
        this.json.Otros = '';
      }else{
        this.json.Otros = this.json.Otros.split("'")[1];
      }

      // this.marcarConsecuencias();

      this.form = new FormGroup({
        'Detec_MGF': new FormControl(),
        'Cicatriz_genital': new FormControl()

      })
    })

    this._expedientesService.getTieneConsecSalud(id).subscribe(data=>{
      console.log('***********************************')
      console.log(data);
      this.consecBD = data;
      this.selecionarCampos();
    })
  }

  ngOnInit() {
  }

  guardarDatos(forma){
    console.log(this.cSel);
    console.log(this.consecuenciasSalud);
    console.log(this.consecBD);
    console.log(this.consecuencia);
    this.obtenerSel();
    //this.selecionarCampos();

    // console.log('Metodo para guardar los datos');
    // console.log(forma);
    // if(this.consecuencia.length > 0){
    //   console.log("entro 1"+ this.consecuenciasSalud.length);
    //   for(var i=1; i< this.consecuenciasSalud.length+1; i++){
    //     if(this.consecuencia[i] == true){
    //       console.log("entro 2 "+ this.consecuencias[i]);
    //       this.consecuencias.push(i);
    //       console.log(this.consecuencias);
    //     }
    //   }
    // }
    //Tengo que añadir las que habia en la BD
    // for(let i=0; i<this.consecBD.length; i++){
    //   this.consecuencias.push(this.consecBD[i].ID_Consecuencia);
    // }
    console.log(this.consecuencia);//Consecuencias selecionadas por el usuario
    console.log(this.json);
    this._expedientesService.updateBloque4(this.json).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }
      this._expedientesService.updateConsecuenciasSalud(this.json.ID_Expediente, this.json.ID_Bloque, this.consecuencia).subscribe(data => {
        console.log(data);
      });
    })

  }
  selecionarCampos(){
    console.log('Metodo axiliar para marcar las complicaciones');
    console.log(this.consecuenciasSalud);
    console.log(this.consecBD);
    console.log(this.consecBD.length)
    console.log(this.consecBD[0]);
    for(let i = 0; i<this.consecBD.length; i++){
      console.log('Iteracion en BD');
      console.log(this.consecBD[i]);
      let aux = this.consecBD[i];
      let encontrada = false;
      for(let j = 0; j<this.consecuenciasSalud.length && encontrada == false; j++){
        if(aux.ID_Consecuencia == this.consecuenciasSalud[j].ID_Consecuencia){
          //Encontrada
          this.consecuenciasSalud[j].Cheked = 1;
          this.cSel[j] = true;
          encontrada = true;
        }
      }
    }
    console.log('Muestro las consecuenciasSalud despues de los bucles');
    console.log(this.consecuenciasSalud);
  }

  obtenerSel(){
    console.log('prueba');
    for(let i=0; i<this.cSel.length; i++){
      if(this.cSel[i] == true){
        this.consecuencia.push(this.consecuenciasSalud[i].ID_Consecuencia);
      }else{
        this.consecuencia.splice(this.consecuenciasSalud[i].ID_Consecuencia,1);
      }
    }
    console.log(this.consecuencia);
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

}
