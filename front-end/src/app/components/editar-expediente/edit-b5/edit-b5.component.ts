import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../../services/expedientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-b5',
  templateUrl: './edit-b5.component.html'
})
export class EditB5Component implements OnInit {

  id;
  bloque5;
  indicadores;
  mostrar:boolean = false;
  indicadoresSel = new Array();
  indicadoresBD;
  form:FormGroup;

  constructor(private router:Router, private _expedientesService: ExpedientesService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params=>{
      this.id = params['id'];
    });
    //Recupero los indicadores
    this._expedientesService.getIndicadores().subscribe(data=> this.indicadores=data);

    this._expedientesService.getBloque5(this.id).subscribe(data=>{
      console.log(data);
      this.bloque5 = data[0];
      // //Limpio el formato de los campos que obtengo de la BD
      if(this.bloque5.Consejos == "''"){
        this.bloque5.Consejos = '';
      }else{
        this.bloque5.Consejos = this.bloque5.Consejos.split("'")[1];
      }
      if(this.bloque5.Intervencion == "''"){
        this.bloque5.Intervencion = '';
      }else{
        this.bloque5.Intervencion = this.bloque5.Intervencion.split("'")[1];
      }
      this.form = new FormGroup({
        'Viajes': new FormControl(2),
        'ViajesPlanificados': new FormControl(2),
        // //Esto lo puedo poner de forma dinamica?
        'indicadores': new FormGroup({
          'indicador1':new FormControl(),
          'indicador2':new FormControl(),
          'indicador3':new FormControl(),
          'indicador4':new FormControl(),
          'indicador5':new FormControl(),
          'indicador6':new FormControl(),
          'indicador7':new FormControl(),
          'indicador8':new FormControl(),
        })
      })

      //Obtengo los indicadores que tiene el bloque5
      this._expedientesService.getIndicadoresById(this.id).subscribe(data=>{
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(data);
        this.indicadoresBD = data;
        //Una vez recuero los que hay marcados => los marco
        this.marcar();
      })
    })


  }
  guardarDatos(){
    console.log('Muestro los datos que recibo del formulario');
    console.log(this.bloque5);
    console.log(this.form);
    // this.obtenerSelecionados();
    //Actualizo los valores del json por lo recogidos por el FormControl
    console.log('Actualizo los valores de los campos de SI/NO');
    this.bloque5.ViajesPlanificados = this.form.value.ViajesPlanificados;
    this.bloque5.Viajes = this.form.value.Viajes;
    console.log('Muestro lo que voy a mandar a la API');
    console.log(this.bloque5);


    // //Ahora hago la peticon para actualizar los datos
    this._expedientesService.updatebloque5(this.bloque5).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return
      }
      this._expedientesService.updateIndicadores(this.bloque5.ID_Expediente, this.bloque5.ID_CAMPOS, this.indicadoresSel).subscribe(data=>{
        //todo actualizado conrrectamente
        console.log(data);
        this.terminar();
      })
    })


  }
  //Funcion que genera un array con todos los indicadores que el usuario ha selecionado
  obtenerSelecionados(){
    this.indicadoresSel = new Array();
    let aux = this.form.get('indicadores').value;
    let k=1;
    for(let i in aux){
      if(aux[i] == true){
        this.indicadoresSel.push(k);
      }
      k = k+1;
    }
    //Tengo que poner el que estaba por defecto
    for(let i = 0; i<this.indicadoresBD.length; i++){
      this.indicadoresSel.push(this.indicadoresBD[i].ID_Indicador);
    }

    console.log('Muesto los indicadores que ha selcionado el usuario');
    console.log(this.indicadoresSel);
  }
  marcar(){
    console.log('Funcion Auxiliar para marcar los indicadores que recibo de la BD');
    console.log(this.indicadoresBD);
    console.log(this.indicadores);
    for(let i = 0; i<this.indicadoresBD.length; i++){
      let aux = this.indicadoresBD[i],
          encontrado = false;
          console.log(aux);
      for(let j = 0; j< this.indicadores.length && encontrado == false; j++){
        if(aux.ID_Indicador == this.indicadores[j].ID_Indicador){
          this.indicadores[j].Checked = 1;
          encontrado = true;
        }
      }
    }
    console.log('Muestro los indicadores despues de marcarlos');
    console.log(this.indicadores);
  }

  ngOnInit() {
  }

  terminar(){
    location.href="/verexpediente;id="+this.id;
  }

}
