import { Component, Inject, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AsociacionesService} from "../../../services/asociaciones.service";
import {Asociacion} from "../../../interfaces/asociacion.interface";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//Maps
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';




@Component({
  selector: 'app-profileAsociacion',
  templateUrl: './profileAsociacion.component.html'
})
export class ProfileAsociacionComponent {

  id:number = 0;
  change:boolean = false;

  asociacion:Asociacion ={
    Nombre: '',
    Direccion: '',
    Email: '',
    Password: '',
    CIF: '',
    Foto: '',
    Telefono:''
  }
  oldPassword = null;
//Variable que almacena la foto de perfil
fP:File;
  //TODO Quitar estos paquetes del package.json
  // uploader:FileUploader;
  // foto:FileUploader;


error:boolean = true;
mensaje:string = '';

//Para lo Google Maps
sitio;
idSitio;
datos = new FormData();

//Para validaciones en la API
oldPlaceName;
oldPais;
oldPlaceId;

@ViewChild('place') public searchElement: ElementRef;
  form;

  constructor(private _asociacionesService:AsociacionesService, private dialog: MatDialog, private element:ElementRef, private ngZone:NgZone, private mapsAPILoader: MapsAPILoader) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
    this.id = parseInt(sessionStorage.getItem('iD'));
    this.cargarAsociacion(this.id);

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


//Metodo añadido para actualizar los datos al hacer el update
  cargarAsociacion(id){
    this._asociacionesService.getAsociacion(this.id).subscribe(data =>{
      console.log(data);
      this.asociacion = data[0];
      this.asociacion.Nombre = this.asociacion.Nombre.split("'")[1];
      this.asociacion.Email = this.asociacion.Email.split("'")[1];
      //this.asociacion.Direccion = this.asociacion.Direccion.split("'")[1];
      this.asociacion.CIF = this.asociacion.CIF.split("'")[1];
      this.asociacion.Password = null;
      this.oldPlaceName = data[0].Sitio;
      this.oldPais = data[0].Pais;
      this.oldPlaceId = data[0].ID_Lugar;
      console.log(this.oldPais);
      console.log(this.asociacion.Password);
    })
  }

  save(forma:NgForm, place){
    // let datos = new FormData();
    let idA = sessionStorage.iD;
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(!emailRegex.test(this.asociacion.Email)){
      this.mensaje = 'Email mal introducido';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
    //Valido el tipo de fichero
    if(this.fP != null){
      let tipo = this.fP.type;
      let aux = tipo.split('/');
      let size = this.fP.size;
      console.log(aux);
      //Tamaño maximo 5MB
      if(aux[0]==='image' && size <= 5242880){
        console.log('Seguimpos adelante');
        this.datos.append('fotoP', this.fP, this.fP.name);

      }else{
        this.mensaje = 'La foto de perfil debe de ser una imagen y menor de 5MB';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }
    }
    //Compruebo que hay contraseña => falta validar que las dos contraseñas sean iguales
    if(forma.value.newpassword != null){
      if(this.oldPassword == forma.value.newpassword){
        //Añado la contrraseña
        this.datos.append('Paswword',forma.value.newpassword);
      }else{
        this.mensaje = 'Las contraseñas no coinciden';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }
    }
    if(this.sitio.gm_accessors_.place.gd.b == true && this.sitio.gm_accessors_.place.gd.l != '' && this.sitio.gm_accessors_.place.gd.place != undefined ){
      this.datos.append('ChangePais', '1');
      this.getDataGoogle(place);
    }else{
      this.datos.append('Pais',this.oldPais);
      this.datos.append('ID_Lugar', this.oldPlaceId);
      this.datos.append('Sitio', this.oldPlaceName);
      this.datos.append('ChangePais', '0');
    }
    this.datos.append('Telefono', this.asociacion.Telefono);

    //console.log(datos);
    console.log(forma.value);
    //Hago la peticion
    this._asociacionesService.upload(this.datos, idA).subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        //PopUp
        this.openDialog();
        console.log(data);
        this.mensaje = 'Cambios registrados correctamente';
        document.getElementById('alert').className = 'alert alert-success';
        this.cargarAsociacion(idA);
        }
    })
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
      this.asociacion.Pais = pais;
      this.datos.append('Pais',pais);
      this.asociacion.ID_Lugar = id;
      this.datos.append('ID_Lugar', id);
      this.asociacion.Sitio = nombre;
      this.datos.append('Sitio', nombre);
      console.log(this.asociacion);
    }
  }
//Metodo para recuperar el fichero
  onFileChange(event){
    let files = event.target.files[0];
    this.fP = files;
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(ProfilePopUp2, {
      width: '1000px',
      //data: { partos: this.partos, auxM: this.auxM, auxN: this.auxN }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
@Component({
  selector: 'popup',
  templateUrl: '../../user/profile/popup.component.html',
})
export class ProfilePopUp2 {

  constructor(
    public dialogRef: MatDialogRef<ProfilePopUp2>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  toHome(){
    this.dialogRef.close();
    location.href = '/asociacion';
  }

}
