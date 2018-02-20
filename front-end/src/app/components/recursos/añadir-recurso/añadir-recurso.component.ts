import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MaterialService } from "../../../services/material.service";
import {Recurso} from '../../../interfaces/recurso.interface';

@Component({
  selector: 'app-recurso',
  templateUrl: './añadir-recurso.component.html'
})
export class RecursoComponent {

  recurso:Recurso = {
    Titulo: '',
    Descripcion: '',
    Publico: -1,
    ID_Formato: 1,
    Archivo: null
  }

  file;
  error:boolean = true;
  mensaje:string = '';
  formatos:object = {};

  constructor(private _materialService:MaterialService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    _materialService.getFormatos().subscribe(data => {
      this.formatos = data;
      console.log(this.formatos);
    }, error => {
      console.log(error);
    });
  }

  loadFile(file){
    if(file.target.files.length === 0){
      this.file = {};

      if(this.mensaje !== ''){
        this.mensaje = '';
        document.getElementById('alert').className = '';
      }
      return;
    }

    this.file = file.target.files[0];
  }

  newRecurso(forma:NgForm){
    let datos = new FormData();

    let file = document.getElementById('file');
    console.log(this.recurso);

    if(forma.valid === false || this.recurso.Publico === -1){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    //Valido el tipo de fichero
    if(this.file != null){
      let tipo = this.file.type.split('/')[1];
      let existeTipo = false;
      for(let i in this.formatos){
        if(this.formatos[i].Nombre === tipo){
          existeTipo = true;
          this.recurso.ID_Formato = this.formatos[i].ID_Formato;
        }
      }

      if(!existeTipo){
        this.mensaje = 'Archivo no aceptado, suba un archivo .pdf, .png, .jpg, .ppt o .mp4';
        document.getElementById('alert').className = 'alert alert-danger';
        return;
      }

      let size = this.file.size;
      //Tamaño maximo 5MB
      if(size <= 5242880){
        this.recurso.Archivo = this.file;
      }else{
        this.mensaje = 'El documento debe de ser menor a 5MB';
        document.getElementById('alert').className = 'alert alert-danger';
      }
    }

    datos.append('Archivo', this.file, this.file.name);
    datos.append('Descripcion', this.recurso.Descripcion);
    datos.append('Publico', String(this.recurso.Publico));
    datos.append('Tipo', String(this.recurso.ID_Formato));
    datos.append('Titulo', this.recurso.Titulo);

    this._materialService.newMaterial(datos).subscribe(data => {
      this.mensaje = 'Gracias por subir su Recurso';
      document.getElementById('alert').className = 'alert alert-success';
    }, error => {
      console.log(error);
    });
  }
}
