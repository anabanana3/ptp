import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AsociacionesService} from "../../../services/asociaciones.service";
import {Asociacion} from "../../../interfaces/asociacion.interface";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



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
  oldPassword = null;
//Variable que almacena la foto de perfil
fP:File;
  //TODO Quitar estos paquetes del package.json
  // uploader:FileUploader;
  // foto:FileUploader;


error:boolean = true;
mensaje:string = '';


  form;

  constructor(private _asociacionesService:AsociacionesService, private dialog: MatDialog) {
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
        return;
      }
    }
    //Compruebo que hay contraseña => falta validar que las dos contraseñas sean iguales
    if(forma.value.newpassword != null){
      if(this.oldPassword == forma.value.newpassword){
        //Añado la contrraseña
        datos.append('Paswword',forma.value.newpassword);
      }else{
        this.mensaje = 'Las contraseñas no coinciden';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }
    }
    //La dierrecion siempre se añade
    datos.append('Direccion', forma.value.direc);

    console.log(datos);
    console.log(forma.value);
    //Hago la peticion
    this._asociacionesService.upload(datos, idA).subscribe(data => {
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
