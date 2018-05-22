import { Component, Inject, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from "../../../services/user.service";
import {AsociacionesService} from "../../../services/asociaciones.service";
import {ProfesionesService} from "../../../services/profesiones.service";
import { User } from "../../../interfaces/user.interface";
import zxcvbn from "zxcvbn";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//Maps
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-profileUser',
  templateUrl: './profileUser.component.html'
})
export class ProfileUserComponent {

  id:number = -1;
  change:boolean = false;
//Recuperar los valores de google Maps para ponerlos por defecto en el campo de direccion
  user:User ={
    Nombre:'',
    Apellidos: '',
    F_Nacimiento: '',
    Email: '',
    Asociacion: '',
    Profesion: '',
    ID_Lugar: '',
    Direccion: '',
    Sexo: '',
    DNI: '',
    Foto: '',
  };

  fP:File;

  pass={
    newpass: '',
    repeatpass: ''
  }

  asociacion:string = '';
  profesion:string = '';
  error:boolean = true;
  profesiones:any[] = [];

  mensaje:string = '';
  repeatpass:string = '';
  scorepass:string = '';

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

  //Para lo Google Maps
  sitio;
  idSitio;
  datos = new FormData();

  //Para validaciones en la API
  oldPlaceName;
  oldPais;
  oldPlaceId;

  @ViewChild('place') public searchElement: ElementRef;

  constructor(private _userService:UserService, private _asociacionesService:AsociacionesService,
              private _profesionesService:ProfesionesService, private dialog: MatDialog, private element:ElementRef, private ngZone:NgZone, private mapsAPILoader: MapsAPILoader) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    this._profesionesService.getProfesiones().subscribe(data=>{
      console.log(data);
      this.profesiones = data;
    })
    this.id = parseInt(sessionStorage.getItem('iD'));

    this._userService.getUsuario(this.id).subscribe(data =>{
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        console.log(data);
        this.user = data[0];

        this.user.Nombre = this.user.Nombre.split("'")[1];
        this.user.Email = this.user.Email.split("'")[1];
        this.user.Direccion = this.user.Direccion.split("'")[1];
        this.user.Asociacion = this.user.Asociacion.split("'")[1];
        this.user.Apellidos = this.user.Apellidos.split("'")[1];
        this.user.DNI = this.user.DNI.split("'")[1];
        this.user.F_Nacimiento = data[0].F_Nacimiento.split('T')[0];
        this.user.Sexo = data[0].ID_Sexo.toString();
        this.oldPlaceName = data[0].Sitio;
        this.oldPais = data[0].Pais;
        this.oldPlaceId = data[0].ID_Lugar;

        console.log(this.user);
      }
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

  save(forma:NgForm){
    console.log(forma);
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(!emailRegex.test(this.user.Email)){
      this.mensaje = 'Email mal introducido';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    console.log(this.user);

    // this._userService.updateUsuario().subscribe(data => {
    //   console.log(data);
    //   this.mensaje = 'Cambios registrados correctamente';
    //   document.getElementById('alert').className = 'alert alert-success';
    // })

    this.mensaje = 'ALGO MAL';
    document.getElementById('alert').className = 'alert alert-danger';

  }

  save2(form:NgForm, place){
    if(form.valid == true){
      //Recojo todos los datos del formulario
      this.datos.append('Nombre', form.value.nombre);
      this.datos.append('Apellidos', form.value.apellido);
      this.datos.append('Fecha', form.value.nacimiento);
      this.datos.append('ID_Sexo', form.value.Sexo);
      this.datos.append('ID_Profesion',form.value.Profesion);
      this.datos.append('Direccion', form.value.direccion);
      //Valido las contraseñas
      if(form.value.contra != null && form.value.repeatcontra){
        if(form.value.contra == form.value.repeatcontra){
          this.datos.append('Password',form.value.contra);
        }else{
          this.mensaje = 'Las contraseñas deben de ser iguales';
          document.getElementById('alert').className = 'alert alert-danger';
        }
      }

      //Valido la foto de perfil
      if(this.fP != null){
        let tipo = this.fP.type;
        let aux = tipo.split('/');
        let size = this.fP.size;
        if(aux[0] ==='image' && size <= 5242880){
          //Fichero Valido
          this.datos.append('fotoP', this.fP, this.fP.name);
        }else{
          this.mensaje = 'La foto de perfil debe de ser una imagen y menor de 5MB';
          document.getElementById('alert').className = 'alert alert-danger';
        }
      }

      //Obtengo el valor de google Maps
      console.log(this.sitio);
      if(this.sitio.gm_accessors_.place.gd.b == true && this.sitio.gm_accessors_.place.gd.l != '' && this.sitio.gm_accessors_.place.gd.place != undefined){
        console.log('Cambio el lugar');
        this.datos.append('ChangePais', '1');
        this.getDataGoogle(place);
      }else{
        console.log('No cambio el lugar');
        this.datos.append('Pais',this.oldPais);
        this.datos.append('ID_Lugar', this.oldPlaceId);
        this.datos.append('Sitio', this.oldPlaceName);
        this.datos.append('ChangePais', '0');
      }
      //Tengo todos los datos => hago la peticion
      this._userService.updateUsuario(this.datos).subscribe(data =>{
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          console.log(data);
          this.openDialog();
        }
      })
    }else{
      this.mensaje = 'Rellena todos los campos obligatorios de tu perfil';
      document.getElementById('alert').className = 'alert alert-danger';
    }

  }

  save3(forma:NgForm){
    //Campos que se pueden modificar
      /*
        => Nombre
        => Apellidos
        => Fecha
        => Sexo
        => Profesion
        => Direccion
        => Foto
        => Password

      */
      console.log(forma.value);
      console.log(this.fP);
      let datos = new FormData();
      if(this.fP !=null){
        let tipo = this.fP.type;
        let aux = tipo.split('/')[0];
        let size = this.fP.size;
        if(aux === 'image' && size <= 5242880){
          //Archivo valido
          datos.append('fotoP', this.fP, this.fP.name);
        }else{
          this.mensaje = 'La foto de perfil debe de ser una imagen y menor de 5MB';
          document.getElementById('alert').className = 'alert alert-danger';
        }
      }

  }

  save4(forma, place){
    console.log(forma.value);
    console.log(place);
    console.log(this.sitio.gm_accessors_.place.gd.b);
    console.log(this.datos)
    // this.getDataGoogle(place);
  }

  getDataGoogle(l){
    console.log(l);
    if(l != ''){
      let pais,
      nombre=this.sitio.gm_accessors_.place.gd.place.name ,
      id = this.sitio.gm_accessors_.place.gd.place.id,
      aux = this.sitio.gm_accessors_.place.gd.place.address_components;
      if(aux.length >=5 ){
        pais = aux[aux.length-2].long_name;
      }else{
        pais = aux[aux.length-1].long_name;
      }
      //Usuario
      this.user.Pais = pais;
      this.datos.append('Pais',pais);
      this.user.ID_Lugar = id;
      this.datos.append('ID_Lugar', id);
      this.user.Sitio = nombre;
      this.datos.append('Sitio', nombre);
      console.log(this.user);
    }
  }
  // validate(pass){
  //   var score = JSON.stringify(zxcvbn(pass).score);
  //   document.getElementById("value").style.width = this.fuerza[score].width;
  //   document.getElementById("value").style.backgroundColor = this.fuerza[score].color;
  //
  //   this.scorepass = score;
  // }

  //Metodo para recuperar el fichero
    onFileChange(event){
      let files = event.target.files[0];
      this.fP = files;
      console.log(this.fP);
    }

    openDialog(): void {
      let dialogRef = this.dialog.open(ProfilePopUp, {
        width: '1000px',
        //data: { partos: this.partos, auxM: this.auxM, auxN: this.auxN }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        location.href='/home';
      });
    }

}

@Component({
  selector: 'popup',
  templateUrl: 'popup.component.html',
})
export class ProfilePopUp {

  constructor(
    public dialogRef: MatDialogRef<ProfilePopUp>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  toHome(){
    this.dialogRef.close();
    location.href = '/home';
  }

}
