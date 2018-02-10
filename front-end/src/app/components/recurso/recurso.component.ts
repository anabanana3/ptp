import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import {Recurso} from '../../interfaces/recurso.interface';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html'
})
export class RecursoComponent {

  recurso:Recurso = {
    Titulo: '',
    Descripcion: '',
    Patch: '',
    Publico: 0,
    ID_Formato: 0,
    ID_Usuario: 0,
  }
  file;
  error:boolean = true;
  mensaje:string = '';

  constructor() {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
  }

  loadFile(file){
    if(file.target.files.length === 0){
      this.file = {};
      this.recurso.Patch = '';

      if(this.mensaje !== ''){
        this.mensaje = '';
        document.getElementById('alert').className = '';
      }
      return;
    }

    this.file = file.target.files[0];
    this.recurso.Patch = file.target.files[0].name;
  }

  newRecurso(forma:NgForm){

    let file = document.getElementById('file');
    console.log(this.recurso);

    if(forma.valid === false || this.recurso.Patch === '' || this.recurso.Publico === 0){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }

    let fileSize = this.file.size;
    console.log(fileSize);

    this.mensaje = 'Campos Completos';
    document.getElementById('alert').className = 'alert alert-success';
    return;
  }
}
