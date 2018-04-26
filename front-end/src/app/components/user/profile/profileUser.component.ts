import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from "../../../services/user.service";
import {AsociacionesService} from "../../../services/asociaciones.service";
import {ProfesionesService} from "../../../services/profesiones.service";
import { User } from "../../../interfaces/user.interface";
import zxcvbn from "zxcvbn";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-profileUser',
  templateUrl: './profileUser.component.html'
})
export class ProfileUserComponent {

  id:number = -1;
  change:boolean = false;

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

  constructor(private _userService:UserService, private _asociacionesService:AsociacionesService,
              private _profesionesService:ProfesionesService, private dialog: MatDialog) {
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
        this.user = data[0];

        this.user.Nombre = this.user.Nombre.split("'")[1];
        this.user.Email = this.user.Email.split("'")[1];
        this.user.Direccion = this.user.Direccion.split("'")[1];
        this.user.Asociacion = this.user.Asociacion.split("'")[1];
        this.user.Apellidos = this.user.Apellidos.split("'")[1];
        this.user.DNI = this.user.DNI.split("'")[1];
        this.user.F_Nacimiento = data[0].F_Nacimiento.split('T')[0];
        this.user.Sexo = data[0].ID_Sexo.toString();

        console.log(this.user);
      }
    })
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

  save2(form:NgForm){
    if(form.valid == true){
      //Recojo todos los datos del formulario
      let datos = new FormData();
      datos.append('Nombre', form.value.nombre);
      datos.append('Apellidos', form.value.apellido);
      datos.append('Fecha', form.value.nacimiento);
      datos.append('ID_Sexo', form.value.Sexo);
      datos.append('ID_Profesion',form.value.Profesion);
      datos.append('Direccion', form.value.direccion);
      //Valido las contraseñas
      if(form.value.contra != null && form.value.repeatcontra){
        if(form.value.contra == form.value.repeatcontra){
          datos.append('Password',form.value.contra);
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
          datos.append('fotoP', this.fP, this.fP.name);
        }else{
          this.mensaje = 'La foto de perfil debe de ser una imagen y menor de 5MB';
          document.getElementById('alert').className = 'alert alert-danger';
        }
      }
      //Tengo todos los datos => hago la peticion
      this._userService.updateUsuario(datos).subscribe(data =>{
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
    // TODO: Campos que se pueden modificar
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
