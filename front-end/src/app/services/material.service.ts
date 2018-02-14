import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Recurso } from '../interfaces/recurso.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class MaterialService {
  nuevoMaterial:string = "https://aisha.ovh/api/material/";

  constructor(private http:Http) { }

  newMaterial(material:Recurso){
    let body = JSON.stringify(material);
    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.post(this.nuevoMaterial, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }
}
