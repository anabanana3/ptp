import { Component, ElementRef, AfterViewInit, NgZone, ViewChild, OnInit } from '@angular/core';
import { ExpedientesService } from "../../../services/expedientes.service";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Persona } from '../../../interfaces/persona';
import { Expedinete } from '../../../interfaces/expediente';
import { ExpedienteComponent } from '../expediente.component';

//Maps
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-bloque1',
  templateUrl: './bloque1.component.html',
  styleUrls: ['./bloque1.component.css']
})

//TODO => Revisar bien las aproximacions porque hay una mezcla entre data y template
//y estamos poniendo codigo inicesareo
export class Bloque1Component implements OnInit {
  opciones = ["NO","SI"];
  actividades= new Array();
  HayMadre:boolean = false;
  HayPadre:boolean = false;
  etnias = new Array();
  form:FormGroup;
  mensaje = '';

  expediente:Expedinete ={
    Titulo:'',
    ID_Expediente:null,
    Fecha:null,
    Descripcion:'',
    ID_Persona:3,
    ID_Lugar:null,
    ID_Usuario:parseInt(sessionStorage.iD)

  };

  menor:Persona = {
    Nombre:'',
    Edad:0,
    ID_Sexo:1,
    ID_Etnia:164,
    ID_Lugar:'',

  };

  madre:Persona ={
    Nombre:'',
    Edad:0,
    ID_Sexo:1,
    ID_Etnia:164,
    ID_Lugar:'',
    ID_Actividad:27
  }
  padre:Persona = {
    Nombre:'',
    Edad:0,
    ID_Sexo:2,
    ID_Etnia:164,
    ID_Lugar:'',
    ID_Actividad:27
  }

  bloque:any = {
    ID_Expediente:'',
    Citacion:0,
    Deriv_Riesgo:0,
    Deriv_Sospecha:0,
    Otros:'',
    Acomp_P:0,
    Acomp_M:0,
    Acomp_H:0,
    Acomp_O:'',
    Dif_Idi_M:0,
    Traduccion:0,
    Mediacion:0,
    Curso:'1ESO',
    Centro_Salud:'Prueba'
  }

  sitiosGoogle = new Array();
  lugarDetec;
  lugarVict;
  lugarMadre;
  lugarPadre;
  idSitio;

  @ViewChild('place') public searchElement: ElementRef;
  @ViewChild('place2') public searchElement2: ElementRef;
  @ViewChild('place3') public searchElement3: ElementRef;
  @ViewChild('place4') public searchElement4: ElementRef;

  //TODO => las validaciones de los campos que se pueden ocultar hay que hacerlas en el html
  constructor(private _expedienteService:ExpedientesService, private expedienteComponent:ExpedienteComponent, private element:ElementRef, private ngZone:NgZone, private mapsAPILoader: MapsAPILoader) {
    console.log('Hola');
    this._expedienteService.getEtnias().subscribe(data=>this.etnias=data);
    this._expedienteService.getActividades().subscribe(data=>this.actividades=data);

   this.form = new FormGroup({
      // 'titulo': new FormControl('', Validators.required),
      'fechaC': new FormControl('', Validators.required),
      'descripcion': new FormControl('Hola', Validators.required),
      'lugarD': new FormControl('', Validators.required),
      'menor': new FormGroup({
              'nombre': new FormControl('', Validators.required),
              'edad': new FormControl('', Validators.required),
              'sexo': new FormControl(),
              'etnia': new FormControl('', Validators.required),
              'lugarN': new FormControl('', Validators.required),
              'actividad': new FormControl(null)
      }),
      'madre': new FormGroup({
              'nombre': new FormControl(),
              'edad': new FormControl(),
              'sexo2': new FormControl('1'),
              'etnia': new FormControl(),
              'lugarN': new FormControl(),
              'actividad': new FormControl()
      }),
      'padre': new FormGroup({
              'nombre': new FormControl(),
              'edad': new FormControl(),
              'sexo3': new FormControl(),
              'etnia': new FormControl(),
              'lugarN': new FormControl(),
              'actividad': new FormControl()
      }),
      'bloque': new FormGroup({
              'ID_Expediente': new FormControl(),
              'Citacion': new FormControl('', Validators.required),
              'Deriv_Riesgo': new FormControl('', Validators.required),
              'Deriv_Sospecha': new FormControl('', Validators.required),
              'Otros': new FormControl(),
              'Acomp_P': new FormControl('', Validators.required),
              'Acomp_M': new FormControl('', Validators.required),
              'Acomp_H': new FormControl('', Validators.required),
              'Acomp_O': new FormControl(),
              'Dif_Idi_M': new FormControl('', Validators.required),
              'Traduccion': new FormControl('', Validators.required),
              'Mediacion': new FormControl('', Validators.required),
              'Curso': new FormControl(),
              'Centro_Salud': new FormControl()
      })

    });
    //this.form.controls['bloque'].setValue(this.bloque);
    console.log(this.bloque);
   }

   ngOnInit(){
     this.apiGoogle();
   }

   apiGoogle(){
     this.mapsAPILoader.load().then(
       () =>{
         //Para el primer campo de google Maps => Lugar de detecion del expediente
         this.lugarDetec = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["geocode"] });
         this.lugarDetec.addListener('place_change', () => {
             this.ngZone.run(()=>{
               let place: google.maps.places.PlaceResult = this.lugarDetec.getPlace();
               if(place.geometry === undefined || place.geometry === null){
                 return
               }
             });
         })
         //Segundo campo de google Maps => lugar de nacimiento del implicado
         this.lugarVict = new  google.maps.places.Autocomplete(this.searchElement2.nativeElement, {types:["geocode"]});
         this.lugarVict.addListener('place_change', () =>{
           this.ngZone.run(()=>{
             let place: google.maps.places.PlaceResult = this.lugarVict.getPlace();
             this.sitiosGoogle.push(place);
           })
         })
         //Lugar de nacimiento de la Madre
         this.lugarMadre = new  google.maps.places.Autocomplete(this.searchElement3.nativeElement, {types:["geocode"]});
         this.lugarMadre.addListener('place_change', () =>{
           this.ngZone.run(()=>{
             let place: google.maps.places.PlaceResult = this.lugarMadre.getPlace();
             this.sitiosGoogle.push(place);
           })
         })
         //Lugar de nacimiento del Padre
         //Lugar de nacimiento de la Madre
         this.lugarPadre = new  google.maps.places.Autocomplete(this.searchElement4.nativeElement, {types:["geocode"]});
         this.lugarPadre.addListener('place_change', () =>{
           this.ngZone.run(()=>{
             let place: google.maps.places.PlaceResult = this.lugarPadre.getPlace();
             this.sitiosGoogle.push(place);
           })
         })
       }
     );
   }

  guardarDatos3(){
    console.log('Muestro la informacion del formulario');
    console.log(this.form.value);
    console.log(this.form)
    if(this.form.valid == false){
      this.mensaje = 'Rellena todos los campos obligatorios'
      document.getElementById('alert').className = 'alert alert-danger';
      window.scroll(0, 0);


    }
    console.log('Probando google maps')
    console.log(this.sitiosGoogle);
    console.log(this.lugarVict);
    console.log(this.lugarDetec);
  }
//TODO => Solo falta meter a los familiares de la persona en el caso de que intropduzcan datos
guardarDatos(){
  console.log('Muestro la persona que voy a crear');
  console.log(this.menor);
  //Obtengo los datos para rellenar la tabla de los campos de bloque 1
  this.bloque = this.form.get('bloque').value;

  if(this.form.valid == true){
    this._expedienteService.addPersona(this.menor).subscribe(data=>{
      //TODO: Solo comprobamos una vez si ha caducado la sesion para que se almacene toda la informacion y no se quede a mitad el expediente
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        //Falta un if para ver que la persona se crea Correctamente
        //Si se crea Correctamente
        let aux=data;
        console.log('Muestro la respuesta de crear una persona e intento mostrar el id de insercion');
        console.log(data);
        console.log(data.insertId);
        let idP = data.insertId;
        this.expediente.ID_Persona=data.insertId;

        //He introducido a la menor implicada en el expediente => introduzco a sus familiares
        if(this.HayMadre==true){
          this.addFamiliar(this.madre,idP, 1);
        }
        if(this.HayPadre == true){
          this.addFamiliar(this.padre, idP, 2);
        }
        //Una vez creadas las relaciones de perentesco creamos los campos del bloque 1
        this._expedienteService.addExpediente(this.expediente).subscribe(data=>{
          //Una vez tengo guardado el expediente y la persona asociada guardo los datos del bloque
          sessionStorage.IDExp = data.insertId;
          this._expedienteService.addBloque(this.bloque, data.insertId).subscribe(data=>{
            console.log(data)
            //Por último => todo correcto cambiamos de bloque
            this.cambiarBloque();
            //  this.expedienteComponent.bloque = 2;
            console.log('Cambio de bloque');

          });
          console.log(data);
        });
      }
    });
  }else{
    this.mensaje = 'Completa todos los campos obligatorios.'
    document.getElementById('alert').className = 'alert alert-danger';
    window.scroll(0, 0);
  }


}
//Funcion de prueba para no estar creando expedientes tontamnte
guardarDatos2(){
  console.log(this.form.value);
  console.log('Muestro la menor');
  console.log(this.menor);
  console.log('Muestro a la madre');
  console.log(this.madre);
  console.log('Muestro al padre');
  console.log(this.padre);
  //Por último => todo correcto cambiamos de bloque
  console.log('Cambio de bloque');
  this.cambiarBloque();
  console.log('Muestro el expediente'),
  console.log(this.expediente);

  this.expedienteComponent.bloque = 2;

}

addFamiliar(persona, familiar, tipo){
  this._expedienteService.addPersona(persona).subscribe(data =>{
    console.log('Creamos la madre o padre');
    console.log(data);
    //una vez creo la persona creo la relacion de parentesco
    this._expedienteService.addFamiliar(data.insertId, familiar, tipo).subscribe(data=>{
      console.log('Creamos la relacion de parentesco');
      console.log(data);
    })
  })
}

//Cambio el bloque del expediente
cambiarBloque(){
  console.log(this.expedienteComponent.bloque);
   this.expedienteComponent.selectedTab = 1;
  //  this.expedienteComponent.bloquearPestanya(1);
  //  this.expedienteComponent.desbloquearPestaña(2);

}



}
