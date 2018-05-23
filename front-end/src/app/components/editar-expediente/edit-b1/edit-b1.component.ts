import { Component, ElementRef, AfterViewInit, NgZone, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedientesService } from '../../../services/expedientes.service';
import { EditarExpedienteComponent } from '../editar-expediente.component';
import { Persona } from '../../../interfaces/persona';
import {FormGroup, FormControl, Validators} from '@angular/forms';

//Maps
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-edit-b1',
  templateUrl: './edit-b1.component.html'
})


export class EditB1Component implements OnInit {

  id:number;
  expediente={
    Titulo:'',
    ID_Expediente:null,
    Fecha:'',
    Descripcion:'',
    ID_Persona:'',
    ID_Lugar:0,
    ID_Usuario:'',
    Sitio:'',
    Pais:''

  };

  menor:Persona = {
    ID_Persona:null,
    Nombre:'',
    Edad:0,
    ID_Sexo:1,
    ID_Etnia:164,
    ID_Lugar:0,
    ID_Actividad:27
  };

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

    etnias;
    actividades;
    form2:FormGroup;
    //madre;
    // padre;
    HayMadre:boolean = false;
    HayPadre:boolean = false;
    madreCreate:boolean = false;;
    padreCreate:boolean =false;

    //Valores por defecto de la madre en el caso de que no haya nada guardado en la BD

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
    //form2:FormGroup;

    //Para marcar los valores que vienen en la BD

    @ViewChild('place') public searchElement: ElementRef;
    @ViewChild('place2') public searchElement2: ElementRef;
    @ViewChild('place3') public searchElement3:ElementRef;
    @ViewChild('place4') public searchElement4:ElementRef;
    lugarDetec;
    lugarVict;
    lugarMadre;
    lugarPadre;

  constructor(private router:Router, private _expedientesService: ExpedientesService, private activatedRoute: ActivatedRoute, private element:ElementRef, private ngZone:NgZone, private mapsAPILoader: MapsAPILoader, private _EditarExpedienteComponent:EditarExpedienteComponent) {
    activatedRoute.params.subscribe(params=>{
      this.id = params['id'];
    });

    // console.log('Muestro el id que hay en la url');
    // console.log(this.id);
    this._expedientesService.getEtnias().subscribe(data=>this.etnias=data);
    this._expedientesService.getActividades().subscribe(data=>this.actividades=data);
    this._expedientesService.getExpedienteById(this.id).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return
      }
      // console.log('************************************');
      // console.log(data);
      // console.log('Muestro la informacion basica del expediente');
      this.expediente = data[0];
      // console.log(this.expediente);
      if(this.expediente.Fecha != null){

        this.expediente.Fecha = this.expediente.Fecha.split('T')[0];
      }
      // this.expediente.Descripcion = this.expediente.Descripcion.split("'")[1];

      //Recupero el id de la menor implicada
      let idPersona = this.expediente.ID_Persona;
      console.log(idPersona);
      //Recupero el bloque 1
      console.log('////////////////////////////////////////');
      this._expedientesService.getBloque1(this.id).subscribe(data =>{
        console.log(data);
        // console.log('Muestro la informacion del bloque 1');
        this.bloque = data[0];
        console.log(this.bloque)
        if(this.bloque.Otros == 'NULL'){
          this.bloque.Otros = '';
        }else{
            this.bloque.Otros = this.bloque.Otros.split("'")[1];
        }
        if(this.bloque.Acomp_O == 'NULL'){
          this.bloque.Acomp_O = '';
        }else{
          this.bloque.Acomp_O = this.bloque.Acomp_O.split("'")[1];
        }
        //Pongo los valores por defecto en el formulario para poder marcar por defecto
        this.form2 = new FormGroup({
          'Citacion': new FormControl(this.bloque.Citacion),
          'Deriv_Riesgo': new FormControl(this.bloque.Deriv_Riesgo),
          'Deriv_Sospecha': new FormControl(this.bloque.Deriv_Sospecha),
          'Acomp_P': new FormControl(this.bloque.Acomp_P),
          'Acomp_M': new FormControl(this.bloque.Acomp_M),
          'Acomp_H': new FormControl(this.bloque.Acomp_H),
          'Dif_Idi_M': new FormControl(this.bloque.Dif_Idi_M),
          'Traduccion': new FormControl(this.bloque.Traduccion),
          'Mediacion': new FormControl(this.bloque.Mediacion),
        })
        console.log(this.form2);


        //Recupero la menor implicada en el Expediente
        this._expedientesService.getPersonaById(idPersona).subscribe(data=>{
          console.log('Muestro la menor')
          console.log(data);
          this.menor = data[0];
          this.menor.ID_Sexo = 1;
          this.menor.Nombre = this.menor.Nombre.split("'")[1];
          // console.log(this.menor.Nombre);
          // console.log(this.menor.Edad);
        })

        this._expedientesService.getFamiliarPersona(idPersona).subscribe(data=>{
          console.log('¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿');
          console.log(data);
          // console.log(data.length);
          if(data.length >0){
            for(let i = 0; i< data.length; i++){
              if(data[i].Tipo == 1){
                // this.madre.push(data[i]);
                this.madre = data[i];
                this.madre.ID_Sexo = 1;
                this.madre.Nombre = this.madre.Nombre.split("'")[1]
                this.madre.ID_Persona = data[i].ID_Persona;
                this.madreCreate = true;
              }else if(data[i].Tipo == 2){
                // this.padre.push(data[i]);
                this.padre = data[i];
                this.padre.ID_Sexo = 2;
                this.padre.Nombre=this.padre.Nombre.split("'")[1];
                this.padre.ID_Persona = data[i].ID_Persona
                this.padreCreate = false;
              }
            }
          }else{
            // console.log('Padre');
            // console.log(this.padre);
            // console.log('Madre');
            // console.log(this.madre);
          }
        })
      })
    })


   }
   getDataGoogle(){
     console.log(this.lugarVict);
    //  console.log(this.lugarDetec);
    //  console.log(this.menor);
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
     }else{
       this.expediente.ID_Lugar= 0;
     }

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
     }else{
       this.menor.ID_Lugar = 0;
     }
     //Obtengo el lugar de la madre
     if(this.lugarMadre != undefined && this.lugarMadre.gm_accessors_.place.gd.b == true && this.lugarMadre.gm_accessors_.place.gd.l != ''){
       //hay datos
       this.madre.ID_Lugar = this.lugarMadre.gm_accessors_.place.gd.place.id;
       this.madre.Sitio = this.lugarMadre.gm_accessors_.place.gd.place.name;
       let aux = this.lugarMadre.gm_accessors_.place.gd.place.address_components;
       if(aux.length >=5 ){
         this.madre.Pais = aux[aux.length-2].long_name;
       }else{
         this.madre.Pais = aux[aux.length-1].long_name;
       }

     }else{
       // TODO:
       //Vacio o el que ya habia
     }
     //Obtengo el lugar de la madre
     if(this.lugarPadre != undefined && this.lugarPadre.gm_accessors_.place.gd.b == true && this.lugarPadre.gm_accessors_.place.gd.l != ''){
       //hay datos
       this.padre.ID_Lugar = this.lugarPadre.gm_accessors_.place.gd.place.id;
       this.padre.Sitio = this.lugarPadre.gm_accessors_.place.gd.place.name;
       let aux = this.lugarPadre.gm_accessors_.place.gd.place.address_components;
       if(aux.length >=5 ){
         this.padre.Pais = aux[aux.length-2].long_name;
       }else{
         this.padre.Pais = aux[aux.length-1].long_name;
       }
     }


    console.log(this.expediente);
    console.log(this.menor);
    console.log('Madre');
    console.log(this.madre);
    console.log('Padre');
    console.log(this.padre);
   }
   guardarDatos(){
    //  console.log('-*-*-*--*-*-*-*-*-***-*-*-*-*-*-*-*-*-*-*-');
     //Miro si se han tocado los campos con fromControl
     this.getDataGoogle();
    // console.log(this.lugarVict);
    // console.log(this.lugarDetec);
     let changeBloque = false;
      //Actualizo los datos del bloque
     this.bloque.Citacion = parseInt(this.form2.value.Citacion);
     this.bloque.Acomp_H = parseInt(this.form2.value.Acomp_H);
     this.bloque.Acomp_M = parseInt(this.form2.value.Acomp_M);
     this.bloque.Acomp_P = parseInt(this.form2.value.Acomp_P);
     this.bloque.Deriv_Riesgo = parseInt(this.form2.value.Deriv_Riesgo);
     this.bloque.Deriv_Sospecha = parseInt(this.form2.value.Deriv_Sospecha);
     this.bloque.Dif_Idi_M = parseInt(this.form2.value.Dif_Idi_M);
     this.bloque.Mediacion = parseInt(this.form2.value.Mediacion);
     this.bloque.Traduccion = parseInt(this.form2.value.Traduccion);
     changeBloque = true;

     console.log(this.expediente);
     console.log(this.id);
    //  Actualizo los datos del expediente
    this._expedientesService.updateExpediente(this.expediente, this.id).subscribe(data=>{
       console.log(data);
       if(data.Codigo == 501){
         location.href = 'expired';
         return;
       }
      //  //Ahora actualizo la informacion de la persona
       this._expedientesService.updatePersona(this.menor, this.menor.ID_Persona).subscribe(data=>{
         console.log('Menor actualizada')
         if(this.HayMadre == true){
          if(this.madreCreate == true){
           //Actualizo la Madre
           console.log('Actualizo Madre');
           this._expedientesService.updatePersona(this.madre, this.madre.ID_Persona).subscribe(data=>{
             console.log('Madre Actualizada');
           })
         }else{
           //No existe Madre la creo
           console.log('Creo la Madre');
           this.addFamiliar(this.madre, this.menor.ID_Persona, 1);
          }
         }

         if(this.HayPadre == true ){
            if(this.padreCreate == true){
              //Actualizo el padre
              this._expedientesService.updatePersona(this.padre, this.padre.ID_Persona).subscribe(data=>{
                console.log('Padre Actualizado');
              })
            }else{
              //Creo el padre
              this.addFamiliar(this.padre, this.menor.ID_Persona, 2);
            }
         }
         //Actualizo la infomracion del bloque
         if(changeBloque == true){
           this._expedientesService.updateBloque(this.bloque, this.id).subscribe(data=>{
            //  console.log('Actualizo los datos del bloque');
            //  console.log(data);
            this.cambiarBloque();
           })
         }
         this.cambiarBloque();
       })
     })
   }

   guardarDatos2(){
     console.log('Muestro todos los datos cargados');
     console.log(this.expediente);
     console.log(this.bloque);
     console.log(this.menor);
     console.log(this.madre);
     console.log(this.padre);
     console.log('Prueba para los lugares de la madre y el padre');
     console.log(this.lugarMadre);
     console.log(this.lugarPadre);
     this.getDataGoogle();
   }
  ngOnInit() {
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
            // this.sitiosGoogle.push(place);
          })
        })

      // this.lugarMadre = new google.maps.places.Autocomplete(this.searchElement3.nativeElement,{types:["geocode"]});
      //   this.lugarMadre.addListener('place_change', ()=>{
      //     this.ngZone.run(()=>{
      //       let place: google.maps.places.PlaceResult = this.lugarMadre.getPlace();
      //     })
      //   })
      }
    );
  }

  cargaMapsMadre(){
    //Time Out para que carge el html y pille la refercia
     setTimeout(() => {
       this.lugarMadre = new google.maps.places.Autocomplete(this.searchElement3.nativeElement,{types:["geocode"]});
         this.lugarMadre.addListener('place_change', ()=>{
           this.ngZone.run(()=>{
             let place: google.maps.places.PlaceResult = this.lugarMadre.getPlace();
           })
         })
     },1000);
  }

  cargaMapsPadre(){
    //Time Out para que carge el html
    console.log('Prueba');
    setTimeout(()=>{
      this.lugarPadre = new google.maps.places.Autocomplete(this.searchElement4.nativeElement,{types:["geocode"]});
      this.lugarPadre.addListener('place_change', ()=>{
        this.ngZone.run(()=>{
          let place: google.maps.places.PlaceResult = this.lugarPadre.getPlace();
        })
      })
    },1000);
  }

  addFamiliar(persona, familiar, tipo){
    console.log('Probando a crear la madre/padre');
    console.log(persona);
    console.log(familiar);
    this._expedientesService.addPersona(persona).subscribe(data =>{
      console.log('Creamos la madre o padre');
      console.log(data);
      console.log(data.insertId);
      //una vez creo la persona creo la relacion de parentesco
      if(tipo == 1){
        this.madre.ID_Persona = data.insertId;
      }else if(tipo == 2){
        this.padre.ID_Persona = data.insertId;
      }
      this._expedientesService.addFamiliar(data.insertId, familiar, tipo).subscribe(data=>{
        console.log('Creamos la relacion de parentesco');
        console.log(data);
      })
    })
  }

  cambiarBloque(){
    console.log('Muestro el selectedTab actual');
     this._EditarExpedienteComponent.selectedTab = 1;

  }

  terminar(){
    location.href="/verexpediente;id="+this.id;
  }


}
