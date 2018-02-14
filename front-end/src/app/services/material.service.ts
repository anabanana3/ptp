import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Recurso } from '../interfaces/recurso.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class MaterialService {
  nuevoMaterial:string = "https://aisha.ovh/api/material/";
  materiales:string = "https://aisha.ovh/api/material/";
  materialesPublicos:string = "https://aisha.ovh/api/material/publicos";
  formatos:string = "https://aisha.ovh/api/formato/";

  constructor(private http:Http) { }

  newMaterial(material:FormData){
    let body = material;
    let token = sessionStorage.getItem('token');
    let url = this.nuevoMaterial + token;

    return this.http.post(url, body).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  getFormatos(){
    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(this.formatos, {headers}).map(res=>res.json());
  }

  getMateriales(){
    let token = sessionStorage.getItem('token');
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(this.materiales, {headers}).map(res=>res.json());
  }

  getMaterialesPublicos(){
    let headers = new Headers({
      'Content-Type':'application/json',
    });

    return this.http.get(this.materialesPublicos, {headers}).map(res=>res.json());
  }
}
