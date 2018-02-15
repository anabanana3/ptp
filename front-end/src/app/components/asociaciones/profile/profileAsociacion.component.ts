import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AsociacionesService} from "../../../services/asociaciones.service";
import {Asociacion} from "../../../interfaces/asociacion.interface";



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
  }
//Variable que almacena la foto de perfil
fP:File;
  //TODO Quitar estos paquetes del package.json
  // uploader:FileUploader;
  // foto:FileUploader;


error:boolean = true;
mensaje:string = '';


  form;

  constructor(private _asociacionesService:AsociacionesService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
    this.id = parseInt(sessionStorage.getItem('iD'));
    this.cargarAsociacion(this.id);

  }

//Metodo añadido para actualizar los datos al hacer el update
  cargarAsociacion(id){
    this._asociacionesService.getAsociacion(this.id).subscribe(data =>{
      this.asociacion = data[0];
      this.asociacion.Nombre = this.asociacion.Nombre.split("'")[1];
      this.asociacion.Email = this.asociacion.Email.split("'")[1];
      this.asociacion.Direccion = this.asociacion.Direccion.split("'")[1];
      this.asociacion.CIF = this.asociacion.CIF.split("'")[1];
      this.asociacion.Password = null;
      console.log(this.asociacion.Password);
    })
  }

  save(forma:NgForm){
    let datos = new FormData();
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
        datos.append('fotoP', this.fP, this.fP.name);

      }else{
        this.mensaje = 'La foto de perfil debe de ser una imagen y menor de 5MB';
        document.getElementById('alert').className = 'alert alert-danger';
      }
    }
    //Compruebo que hay contraseña
    if(forma.value.newpassword != null){
      //Añado la contrraseña
      datos.append('Paswword',forma.value.newpassword);
    }
    //La dierrecion siempre se añade
    datos.append('Direccion', forma.value.direc);

    //Hago la peticion
    this._asociacionesService.upload(datos, idA).subscribe(data => {
      console.log(data);
      this.mensaje = 'Cambios registrados correctamente';
      document.getElementById('alert').className = 'alert alert-success';
      this.cargarAsociacion(idA);
    }, error => {
      this.mensaje = 'ALGO MAL';
      document.getElementById('alert').className = 'alert alert-danger';
    })
  }



//Metodo para recuperar el fichero
  onFileChange(event){
    let files = event.target.files[0];
    this.fP = files;
  }
}
