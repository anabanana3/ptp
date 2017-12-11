import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Asociacion } from '../interfaces/asociacion.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class AsociacionesService {

  url:string = "https://www.aisha.ovh/api/asociacion";
  constructor(private http:Http) {

  }
  getAsociaciones(){
    return this.http.get(this.url).map(res=>res.json());
  }

  deleteAsociacion(){
    let url = "https://www.aisha.ovh/api/asociacion";
    return this.http.get(this.url).map(res=>res.json());
  }

  nuevaAsociacion(asociacion:Asociacion){
    let body = JSON.stringify(asociacion);

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post(this.url, body, {headers:headers})
        .map(res=>{
          console.log(res.json());
          return res.json();
        })
  }
}