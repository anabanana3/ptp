import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../../services/expedientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditarExpedienteComponent } from '../editar-expediente.component';

@Component({
  selector: 'app-edit-b3',
  templateUrl: './edit-b3.component.html'
})
export class EditB3Component implements OnInit {

  json = {
    ID_Expediente: '',
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
  form:FormGroup;
  id:number;

  constructor(private router:Router, private _expedientesService: ExpedientesService, private activatedRoute: ActivatedRoute, private _EditarExpedienteComponent:EditarExpedienteComponent) {
    activatedRoute.params.subscribe(params=>{
      this.id = params['id'];
    });

    this._expedientesService.getBloque3(this.id).subscribe(data=>{
      console.log('Muestro el bloque 3')
      console.log(data);
      this.json=data[0];
      //Quito las comillas y los valores por defecto que devuelve la BD
      if(this.json.Consejo== ''){
        this.json.Consejo='';
      }else{
        this.json.Consejo=this.json.Consejo.split("'")[1];
      }
      if(this.json.Exp_propias == "''"){
        this.json.Exp_propias = '';
      }else{
        this.json.Exp_propias = this.json.Exp_propias.split("'")[1];
      }
      if(this.json.Formato_int == "''"){
        this.json.Formato_int = '';
      }else{
        this.json.Formato_int = this.json.Formato_int.split("'")[1];
      }
      if(this.json.Exp_terceros == "''"){
        this.json.Exp_terceros = '';
      }else{
        this.json.Exp_terceros = this.json.Exp_terceros.split("'")[1];
      }
      if(this.json.Mant_MGF_texto == "''"){
        this.json.Mant_MGF_texto = '';
      }else{
        this.json.Mant_MGF_texto = this.json.Mant_MGF_texto.split("'")[1];
      }
      if(this.json.Otros_consecH == "''"){
        this.json.Otros_consecH = '';
      }else{
        this.json.Otros_consecH.split("'")[1];
      }
      if(this.json.Otros_consecM == "''"){
        this.json.Otros_consecM = '';
      }else{
        this.json.Otros_consecM = this.json.Otros_consecM.split("'")[1];
      }

      this.form = new FormGroup({
        'Mant_MGF': new FormControl(this.json.Mant_MGF),
        'Conoc_consecM' : new FormControl(this.json.Conoc_consecH),
        'Conoc_consecH' : new FormControl(this.json.Conoc_consecH),
      })
    })

   }

  ngOnInit() {
  }

  guardarDatos(f){
    this.json.Mant_MGF = parseInt(this.form.value.Mant_MGF);
    this.json.Conoc_consecH = parseInt(this.form.value.Conoc_consecH);
    this.json.Conoc_consecM = parseInt(this.form.value.Conoc_consecM);

    this._expedientesService.updateBloque3(this.json).subscribe(data=>{
      if(data.Codigo == 501){
        location.href='/expired';
        return;
      }
      this.cambiarBloque();
      console.log(data);
    })

  }

  cambiarBloque(){
     console.log('Cambio de bloque');
     this._EditarExpedienteComponent.selectedTab = 3;
  }
  terminar(){
    location.href="/verexpediente;id="+this.id;
  }

}
