import { Component, OnInit } from '@angular/core';
import {ExpedientesService} from '../../../services/expedientes.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-bloque5',
  templateUrl: './bloque5.component.html',
  styleUrls: []
})
export class Bloque5Component implements OnInit {
  opciones = ["NO","SI"];
  form:FormGroup;
  //Variable para mostrar/ocultar los indicadores
  mostrar:boolean = false;
  //Variable que va almacenar los valores de la BD
  indicadores = new Array();
  //Variable que va a almacenar los indicadores que selecciona el usuario
  selecionados = new Array();
  //Variable para imprimir un mensaje de Error
  mensaje:string = '';

  constructor(private _expedienteService:ExpedientesService) {
    this._expedienteService.getIndicadores().subscribe(data=>{
      this.indicadores = data
      console.log(this.indicadores);
    })

    this.form = new FormGroup({
      'ID_Campos': new FormControl(null),
      //Este campo lo suyo sera almacenarlo en la sessionStorage cuando se completa el bloque 1
      'ID_Expediente': new FormControl(sessionStorage.IDExp),
      'Viajes': new FormControl(),
      'ViajesPlanifiacados': new FormControl(),
      'Intervencion': new FormControl(),
      'Consejos': new FormControl(),
//Esto lo puedo poner de forma dinamica?
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
   }

  ngOnInit() {
  }

  guardarDatos(){
    if(this.form.valid == true){
      console.log('A continuacionhay que recoger los datos para mandarlos al servidor');
      //Aqui ya tengo los datos necesareos recogidos del formulario
      console.log(this.form.value);
      this._expedienteService.addbloque5(this.form.value).subscribe(data=>{
        console.log('añadimos los campos del bloque 5');
        console.log(data);
        //Recupero el id del bloque que se acaba de generar
        let idBloque = data.insertId;
        this.obtenerSelecionados();
        if(this.selecionados.length>0){
          console.log('añado los indicadores');
          //Los almaceno => necesito almacenar en la sessionStorage el id Expediente que se crea en el bloque 1
          var exp = sessionStorage.IDExp;
          this._expedienteService.addIndicadores(exp, idBloque, this.selecionados).subscribe(data=>{
            console.log(data);
            sessionStorage.removeItem('IDExp');
            location.href = '/home';

          })
        }
      });
    }else{
      this.mensaje = 'Completa todos los campos obligatorios';
      document.getElementById('alert').className = 'alert alert-danger';
    }

  }
  //Funcion que genera un array con todos los indicadores que el usuario ha selecionado
  obtenerSelecionados(){
    let aux = this.form.get('indicadores').value;
    let k=1;
    for(let i in aux){
      if(aux[i] == true){
        this.selecionados.push(k);
      }
      k = k+1;
    }
  }

guardarDatos3(){
    console.log('Metodo para hacer la validacion de los datos del bloque 5')
    console.log(this.form);
    console.log(this.form.value);
  }



  guardarDatos2(){
    console.log(this.form.value);
    let aux = this.form.get('indicadores').value;
    console.log('Muestro los inidcadores', aux);
    console.log(aux.indicador1);
    console.log(aux['indicador1']);
    let k=1;
    for(let i in aux){
      if(aux[i] == true){
        this.selecionados.push(k);
      }
      k = k+1;
    }
    this._expedienteService.addIndicadores(15,2, this.selecionados).subscribe(data=>{
      console.log(data);
    });
    //Mando este array con los indicadores que ha selecionado el usuairo
    console.log(this.selecionados.length);
    console.log(this.selecionados);
  }

}
