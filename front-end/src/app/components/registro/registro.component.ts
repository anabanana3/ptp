import { Component, ElementRef, AfterViewInit, NgZone, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../../interfaces/user.interface";
import zxcvbn from "zxcvbn";

import { ProfesionesService } from "../../services/profesiones.service";
import { AsociacionesService } from "../../services/asociaciones.service";
import { UserService } from "../../services/user.service";
import { Asociacion } from "../../interfaces/asociacion.interface";

//Maps
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  usuario:User={
    Nombre:'',
    Apellidos: '',
    F_Nacimiento: '', /*TODO BORRAR*/
    Email: '',
    ID_Asociacion: 0,
    ID_Profesion: 0,
    ID_Lugar: '',
    Direccion: '',
    Sexo: 1,   /*TODO BORRAR*/
    DNI: '',
    Captcha: null
  }

  asociacion:Asociacion ={
    Nombre:'',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: '',
    Captcha: null
  }

  fuerza = {
    0:{
      color: '',
      width: '0'
    },
    1:{
      color: 'red',
      width: '25%'
    },
    2:{
      color: 'orange',
      width: '50%'
    },
    3:{
      color: 'yellow',
      width: '75%'
    },
    4:{
      color: 'green',
      width: '100%'
    }
  }


  id:string;
  profesiones:any[] = [];
  asociaciones:any[] = [];

  usuarios:boolean = true;

  mensaje:string = '';
  repeatpass:string = '';
  scorepass:string = '';

  captcha;
  sitio;
  idSitio;

  @ViewChild('place') public searchElement: ElementRef;


  constructor(private _profesionesService:ProfesionesService, private _asociacionesService:AsociacionesService,
    private router:Router, private _userService:UserService, private activatedRoute:ActivatedRoute, private element:ElementRef, private ngZone:NgZone, private mapsAPILoader: MapsAPILoader) {
      console.log('Contructor');
    this._profesionesService.getProfesiones().subscribe(data=>{
      this.profesiones = data;
    })

    this._asociacionesService.getAsociacionesValidadas().subscribe(data=>{
      this.asociaciones = data;
    })


  }

  ngOnInit(){
    this.apiGoogle();
  }

  apiGoogle(){
    this.mapsAPILoader.load().then(
      () =>{
        this.sitio = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["geocode"] });

        this.sitio.addListener('place_change', () => {
            this.ngZone.run(()=>{
              let place: google.maps.places.PlaceResult = this.sitio.getPlace();
              this.idSitio = place.id;



              if(place.geometry === undefined || place.geometry === null){
                return
              }
            });
        })
      }
    );
  }

  guardarDatos(form, place){


    // console.log(this.sitio.gm_accessors_.place.Jc.place.id);
    console.log('Obtengo el id del sitio');
    console.log(this.sitio.gm_accessors_.place.Jc.place.id);

    console.log('Obtenfo el nombre del sitio');
    console.log(this.sitio.gm_accessors_.place.Jc.place.name);

    console.log(place.value);
    console.log('Calculo el puto pais al que pertenece el sitio');
    let aux = this.sitio.gm_accessors_.place.Jc.place.address_components;
    console.log('Prueba');
    if(aux.length >=5 ){
      console.log(aux[aux.length-2]);
    }else{
      console.log(aux[aux.length-1]);
    }
    //Muestro el pais del sitio seleccionado => el ultimo valor del array
    let datos = this.sitio.gm_accessors_.place.Jc.place.address_components;
    console.log(datos);
    console.log(this.idSitio)
  }

  getDataGoogle(l){
    let pais,
        nombre=this.sitio.gm_accessors_.place.Jc.place.name ,
        id = this.sitio.gm_accessors_.place.Jc.place.id,
        aux = this.sitio.gm_accessors_.place.Jc.place.address_components;
    if(aux.length >=5 ){
      pais = aux[aux.length-2].long_name;
    }else{
      pais = aux[aux.length-1].long_name;
    }

    if(this.usuarios == true){
      //Usuario
      this.usuario.Pais = pais;
      this.usuario.ID_Lugar = id;
      this.usuario.Lugar = nombre;
    }else{
      //Asociacion
      this.asociacion.Pais = pais;
      this.asociacion.ID_Lugar = id;
      this.asociacion.Lugar = nombre;
    }
  }

  new(forma:NgForm, bool, lugar){
    if(forma.valid === false){
      location.href = '/registro#arriba'
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    //obtengo el valor del captcha
    let captcha = this.element.nativeElement.querySelector('#g-recaptcha-response').value;
    //Obtengo los valores de lugar
    this.getDataGoogle(lugar);
    if(!bool){
      //ASOCIACION
      this.asociacion.Captcha = captcha;
      if(!emailRegex.test(this.asociacion.Email)){
        location.href = '/registro#arriba';
        this.mensaje = 'Email mal introducido';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }

      if(this.asociacion.Password !== this.repeatpass){
        location.href = '/registro#arriba';
        this.mensaje = 'Las contraseñas introducidas no son iguales';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }

      if(parseInt(this.scorepass) < 2){
        location.href = '/registro#arriba';
        this.mensaje = 'La contraseña es demasiado débil';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }
      console.log(this.asociacion);
      this._asociacionesService.newAsociacion(this.asociacion).subscribe(data=>{
        console.log('data');
        console.log(data);
        if(data.warningCount == 0){
          this.mensaje = 'Gracias por registrarse! Recibirá un email cuando la asociación sea aceptada.';
          document.getElementById('alert').className = 'alert alert-success';
        }else{
          if(data.Codigo == 510){
            this.mensaje = 'El email que has introducio ya esta registrado';
            document.getElementById('alert').className = 'alert alert-danger';
          }
        }
      }, error=>{
        this.mensaje = 'Campos Incompletos';
        document.getElementById('alert').className = 'alert alert-danger';
        console.log(error);
      });
    }
    else{
      //USUARIO
      this.usuario.Captcha = captcha;
      if(!emailRegex.test(this.usuario.Email)){
        this.mensaje = 'Email mal introducido';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }

      this.usuario.Direccion = this.usuario.ID_Lugar;
      console.log(this.usuario);
      this._userService.newUsuario(this.usuario).subscribe(data=>{
        if(data.warningCount == 0){
          this.mensaje = 'Gracias por registrarse! Recibirá un email cuando sea aceptado por su asociación';
          location.href = '/registro#arriba';
          document.getElementById('alert').className = 'alert alert-success';
        }else{
          if(data.Codigo == 510){
            this.mensaje = 'El email que has introducio ya esta registrado';
            document.getElementById('alert').className = 'alert alert-danger';
          }
        }
      }, error=>{
        this.mensaje = 'Campos Incompletos';
        document.getElementById('alert').className = 'alert alert-danger';
        console.log(error);
      });
    }
  }

  validate(pass){
    var score = JSON.stringify(zxcvbn(pass).score);
    document.getElementById("value").style.width = this.fuerza[score].width;
    document.getElementById("value").style.backgroundColor = this.fuerza[score].color;

    this.scorepass = score;
  }



}
