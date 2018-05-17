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
  templateUrl: './bloque1.component.html'
})

//TODO => Revisar bien las aproximacions porque hay una mezcla entre data y template
//y estamos poniendo codigo inicesareo
export class Bloque1Component implements OnInit {
  opciones = ["NO","SI"];
  actividades= new Array();
  HayMadre:boolean = false;
  MadreCreate:boolean = false;
  HayPadre:boolean = false;
  PadreCreate:boolean = false;
  etnias = new Array();
  form:FormGroup;
  mensaje = '';

  expediente:Expedinete ={
    Titulo:'',
    ID_Expediente:null,
    Fecha:null,
    Descripcion:'',
    ID_Persona:sessionStorage.IDPer,
    ID_Lugar:0,
    ID_Usuario:parseInt(sessionStorage.iD)

  };

  menor:Persona = {
    ID_Persona:sessionStorage.IDPer,
    Nombre:'',
    Edad:0,
    ID_Sexo:1,
    ID_Etnia:164,
    ID_Lugar:0,
    ID_Actividad:27

  };

  madre:Persona ={
    ID_Persona:null,
    Nombre:'',
    Edad:0,
    ID_Sexo:3,
    ID_Etnia:164,
    ID_Lugar:0,
    ID_Actividad:27
  }
  padre:Persona = {
    ID_Persona:null,
    Nombre:'',
    Edad:0,
    ID_Sexo:3,
    ID_Etnia:164,
    ID_Lugar:0,
    ID_Actividad:27
  }

  bloque:any = {
    ID_Expediente:'',
    Citacion:2,
    Deriv_Riesgo:2,
    Deriv_Sospecha:2,
    Otros:'',
    Acomp_P:2,
    Acomp_M:2,
    Acomp_H:2,
    Acomp_O:'',
    Dif_Idi_M:2,
    Traduccion:2,
    Mediacion:2,
    Curso:'No empleado',
    Centro_Salud:'No empleado'
  }

  sitiosGoogle = new Array();
  lugarDetec;
  lugarVict;
  lugarMadre;
  lugarPadre;
  idSitio;

  @ViewChild('place') public searchElement: ElementRef;
  @ViewChild('place2') public searchElement2: ElementRef;
  // @ViewChild('place3') public searchElement3: ElementRef;
  // @ViewChild('place4') public searchElement4: ElementRef;

  //TODO => las validaciones de los campos que se pueden ocultar hay que hacerlas en el html
  constructor(private _expedienteService:ExpedientesService, private expedienteComponent:ExpedienteComponent, private element:ElementRef, private ngZone:NgZone, private mapsAPILoader: MapsAPILoader) {
    console.log('Hola Contructor del bloque 1');
    console.log( this.expedienteComponent.selectedTab);
    this._expedienteService.getEtnias().subscribe(data=>this.etnias=data);
    this._expedienteService.getActividades().subscribe(data=>this.actividades=data);

   this.form = new FormGroup({
      // 'titulo': new FormControl('', Validators.required),
      'fechaC': new FormControl('' ),
      'descripcion': new FormControl('Hola'),
      'lugarD': new FormControl(),
      'menor': new FormGroup({
              'nombre': new FormControl(''),
              'edad': new FormControl(''),
              'sexo': new FormControl(),
              'etnia': new FormControl(),
              'lugarN': new FormControl(),
              'actividad': new FormControl()
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
              'Citacion': new FormControl(2),
              'Deriv_Riesgo': new FormControl(2),
              'Deriv_Sospecha': new FormControl(2),
              'Otros': new FormControl(''),
              'Acomp_P': new FormControl(2),
              'Acomp_M': new FormControl(2),
              'Acomp_H': new FormControl(2),
              'Acomp_O': new FormControl(''),
              'Dif_Idi_M': new FormControl(2),
              'Traduccion': new FormControl(2),
              'Mediacion': new FormControl(2),
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
        //  this.lugarMadre = new  google.maps.places.Autocomplete(this.searchElement3.nativeElement, {types:["geocode"]});
        //  this.lugarMadre.addListener('place_change', () =>{
        //    this.ngZone.run(()=>{
        //      let place: google.maps.places.PlaceResult = this.lugarMadre.getPlace();
        //      this.sitiosGoogle.push(place);
        //    })
        //  })
        //  //Lugar de nacimiento del Padre
        //  //Lugar de nacimiento de la Madre
        //  this.lugarPadre = new  google.maps.places.Autocomplete(this.searchElement4.nativeElement, {types:["geocode"]});
        //  this.lugarPadre.addListener('place_change', () =>{
        //    this.ngZone.run(()=>{
        //      let place: google.maps.places.PlaceResult = this.lugarPadre.getPlace();
        //      this.sitiosGoogle.push(place);
        //    })
        //  })
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
    console.log('Probando cosas');
    console.log(this.expediente);
  }
// TODO: Ahora los metodos de addPersona y addExpediente van a ser UPDATES, ya que el expiente ya lo voy a tener creado de antemano
guardarDatos(){
  console.log('Muestro la persona que voy a crear');
  console.log(this.menor);
  //Obtengo los datos para rellenar la tabla de los campos de bloque 1
  this.bloque = this.form.get('bloque').value;

  if(this.form.valid == true){
    this.getDataGoogle();
    // this._expedienteService.addPersona(this.menor).subscribe(data=>{
    this.menor.ID_Persona = sessionStorage.IDPer;
    this.expediente.ID_Expediente = sessionStorage.IDExp;
    this.expediente.ID_Persona = sessionStorage.IDPer
    this._expedienteService.updatePersona(this.menor, this.menor.ID_Persona).subscribe(data=>{
      //TODO: Solo comprobamos una vez si ha caducado la sesion para que se almacene toda la informacion y no se quede a mitad el expediente
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        //Falta un if para ver que la persona se crea Correctamente
        //Si se crea Correctamente
        let aux=data;
        console.log('Muestro la respuesta de actualizar una persona e intento mostrar el id de insercion');
        console.log(data);
        // console.log(data.insertId);
        let idP = data.insertId;
        // this.expediente.ID_Persona=data.insertId;
        this.expediente.ID_Persona = this.menor.ID_Persona;

        //He introducido a la menor implicada en el expediente => introduzco a sus familiares
        if(this.HayMadre == true ){
          if(this.MadreCreate == false){
            //Creo la persona y le asigno su familiares
            console.log('Menor');
            console.log(this.menor.ID_Persona);
            console.log('Expediente');
            console.log(this.expediente.ID_Persona);
             this.addFamiliar(this.madre,this.menor.ID_Persona, 1);
            this.MadreCreate = true;
          }else{
            //Update Madre
            this._expedienteService.updatePersona(this.madre, this.madre.ID_Persona)
          }
        }
        if(this.HayPadre == true){
          if(this.PadreCreate == false){
            this.addFamiliar(this.padre, this.menor.ID_Persona, 2);
            this.PadreCreate = true;
          }else{
            //Update Padre
            this._expedienteService.updatePersona(this.padre, this.padre.ID_Persona);
          }
        }
        //Una vez creadas las relaciones de perentesco creamos los campos del bloque 1
        //this._expedienteService.addExpediente(this.expediente).subscribe(data=>{
        this._expedienteService.updateExpediente(this.expediente, this.expediente.ID_Expediente).subscribe(data=>{
          //Una vez tengo guardado el expediente y la persona asociada guardo los datos del bloque
          //sessionStorage.IDExp = data.insertId;
          //this._expedienteService.addBloque(this.bloque,this.expediente.ID_Expediente).subscribe(data=>{
          this._expedienteService.updateBloque(this.bloque,this.expediente.ID_Expediente).subscribe(data=>{
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
  console.log('Muestro el formulario');
  console.log(this.form);
  console.log('Muestro el estado inicial del bloque');
  console.log(this.bloque);
  this.getDataGoogle();
  this.cambiarBloque();

}

getDataGoogle(){
  console.log('Funcion para obtener los datos de google Maps');
  console.log('Lugar de deteccion del expediente');
  console.log(this.lugarDetec);
  //Compruebo que se ha introducido informacion
  if(this.lugarDetec.gm_accessors_.place.gd.b == true){
    //Hay datos => obtengo el pais y el lugar
    this.expediente.ID_Lugar = this.lugarDetec.gm_accessors_.place.gd.place.id;
    this.expediente.Sitio = this.lugarDetec.gm_accessors_.place.gd.place.name;
    let aux = this.lugarDetec.gm_accessors_.place.gd.place.address_components;
    if(aux.length >=5 ){
      this.expediente.Pais = aux[aux.length-2].long_name;
    }else{
      this.expediente.Pais = aux[aux.length-1].long_name;
    }
  }
  console.log('Lugar de nacimiento del titular');
  console.log(this.lugarVict);
  if(this.lugarVict.gm_accessors_.place.gd.b == true){
    //Hay datos => obtengo el pais y el lugar
    this.menor.ID_Lugar = this.lugarVict.gm_accessors_.place.gd.place.id;
    this.menor.Sitio = this.lugarVict.gm_accessors_.place.gd.place.name;
    let aux = this.lugarVict.gm_accessors_.place.gd.place.address_components;
    if(aux.length >=5 ){
      this.menor.Pais = aux[aux.length-2].long_name;
    }else{
      this.menor.Pais = aux[aux.length-1].long_name;
    }
  }
  console.log(this.expediente);
  console.log(this.menor);
}


addFamiliar(persona, familiar, tipo){
  console.log('Probando a crear la madre/padre');
  console.log(persona);
  console.log(familiar);
  this._expedienteService.addPersona(persona).subscribe(data =>{
    console.log('Creamos la madre o padre');
    console.log(data.insertId);
    //una vez creo la persona creo la relacion de parentesco
    this._expedienteService.addFamiliar(data.insertId, familiar, tipo).subscribe(data=>{
      console.log('Creamos la relacion de parentesco');
      console.log(data);
    })
  })
}

//Cambio el bloque del expediente
cambiarBloque(){
  console.log('Muestro el selectedTab actual');
  console.log(this.expedienteComponent.selectedTab);
  // console.log(this.expedienteComponent.bloque);

   this.expedienteComponent.selectedTab = 1;
  //  this.expedienteComponent.bloquearPestanya(1);
  //  this.expedienteComponent.desbloquearPestaña(2);

}



}
