import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MaterialService } from "../../../services/material.service";
import {Recurso} from '../../../interfaces/recurso.interface';
import { ActivatedRoute } from '@angular/router';

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
  idEditar;

  file;
  error:boolean = true;
  mensaje:string = '';
  formatos:object = {};

  constructor(private _materialService:MaterialService,
              private activatedRoute: ActivatedRoute) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    _materialService.getFormatos().subscribe(data => {
      this.formatos = data;
      //Solucion regulera
      let aux = {
        ID_Formato: 3,
        Nombre: 'jpeg'
      };
      this.formatos[5] = aux;
    }, error => {
      console.log(error);
    });

    let id:number;
    activatedRoute.params.subscribe(params =>{
      id = params['id'];
    })

    if(id !== undefined){
      this.idEditar = id;
      _materialService.getMaterial(id).subscribe(data => {
        console.log(data);
        this.recurso.Titulo = data[0].Titulo.split("'");
        this.recurso.Descripcion = data[0].Descripcion.split("'");
        this.recurso.Publico = data[0].Publico;
        this.recurso.Archivo = data[0].Path;
        this.recurso.ID_Formato = data[0].ID_Formato;
      })
    }
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

    if(this.idEditar){
      console.log(this.recurso);
      this._materialService.updateMaterial(this.idEditar, this.recurso).subscribe(data => {
        console.log(data);
        if(data.Codigo == 501){
          //La sesion ha expirado y reedirigimos
          location.href = '/expired';
        }
        this.mensaje = 'Su recurso ha sido editado';
        document.getElementById('alert').className = 'alert alert-success';
      })
      return;
    }

    let file = document.getElementById('file');

    if(forma.valid === false || this.recurso.Publico === -1){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    //Valido el tipo de fichero
    if(this.file != null){
      console.log(this.file);
      let tipo = this.file.type.split('/')[1];
      console.log(tipo)
      let existeTipo = false;
      for(let i in this.formatos){
        console.log(this.formatos[i].Nombre);
        console.log()
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
    }else{
      this.mensaje = 'No ha introducido ningún fichero';
      document.getElementById('alert').className = 'alert alert-danger';
    }

    datos.append('Archivo', this.file, this.file.name);
    datos.append('Descripcion', this.recurso.Descripcion);
    datos.append('Publico', String(this.recurso.Publico));
    datos.append('Tipo', String(this.recurso.ID_Formato));
    datos.append('Titulo', this.recurso.Titulo);

    this._materialService.newMaterial(datos).subscribe(data => {
      console.log('muestro la data')
      console.log(data);
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.mensaje = 'Gracias por subir su Recurso';
        document.getElementById('alert').className = 'alert alert-success';
      }
    })
  }
}
