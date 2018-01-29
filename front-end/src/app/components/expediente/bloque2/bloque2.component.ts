import { Component, OnInit } from '@angular/core';
import { ExpedientesService} from '../../../services/expedientes.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-bloque2',
  templateUrl: './bloque2.component.html',
  styleUrls: []
})
export class Bloque2Component implements OnInit {
  opciones = ["No", 'Si'];
  opciones2 =["A favor", "En contra"];
  numPartos:number;
  formulas = new Array();
  tiposMutilacion = new Array();
  compNacido = new Array();
  compMadre = new Array();
  partos = new Array(this.numPartos);
  totalPartos = new Array(this.numPartos);
  hayParto:boolean = false;
  html:string;

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
  guardarDatos(){
    console.log('Se viene marronazo');
    console.log(this.numPartos);
  }
  prueba(n){
    console.log('Funcion de prueba de ocntenido');
    console.log(this.numPartos);
  //  let html;
    for(let i=0; i<n;i++){
      this.html += `<p> parto numero 1</p>
      <label>Edad de la madre en el momento del parto</label>
      <input type="number">
      <br>
      <label>Fecha del parto</label>
      <input type="date">
      <br>
      <!--Este valor lo voy a calcular en funcion de la fecha que introduzca el usuario-->
      <label>Edad del nacido(Ver si lo podemos hacer automatico)</label>
      <input type="number">
      <br>
      <label> Tiempo expulsivo</label>
      <input type="number">
      <br>
      <label> Tiempo de dialtación</label>
      <input type="number">
      <br>
      <label> Duración del parto</label>
      <input type="number">
      <br>
      <label>Formula obstretica realizada</label>
      <select>
        <option *ngFor="let f of formulas" [value]="f.ID_Formula">{{f.Nombre}}</option>
      </select>
    <br>
    <label>Test APGAR</label>
    <input type="number">
    <br>
    <label>Tipo de mutilación que padece la madre en el momento del parto</label>
    <select>
        <option *ngFor="let t of tiposMutilacion" [value]="t.ID_Mutilacion">{{t.Nombre}} {{t.Tipo}}</option>
    </select>
    <br>
    <p>Seleccione las complicaciones sufrió la madre durante el parto</p>
    <div *ngFor="let c of compMadre">
      <label>{{c.Nombre}}</label>
      <input type="checkbox">
    </div>
    <br><br>
    <p>Seleccione las complicaciones sufrió el recien nacido durante el parto</p>
    <div *ngFor="let c of compNacido">
      <label>{{c.Nombre}}</label>
      <input type="checkbox">
    </div>`;
    }
    //document.getElementById('prueba').innerHTML = html;
  }

}
