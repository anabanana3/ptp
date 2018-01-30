
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Asociacion } from '../interfaces/asociacion.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class AsociacionesService {
  url:string = "https://www.aisha.ovh/api/asociacion/";
  loginURL:string = "https://www.aisha.ovh/api/asociacion/login";
  activarURL:string = "https://www.aisha.ovh/api/mail/send/asociacion";
  validadasURL:string = "https://www.aisha.ovh/api/asociacion/validadas/1";
  cancelarURL:string ="https://www.aisha.ovh/api/asociacion/cancelar/";

  constructor(private http:Http) { }

  getAsociaciones(numPag, tamPag){
    let url = `${this.url}pag=${numPag}&n=${tamPag}`;
    return this.http.get(url).map(res=>res.json());
  }

  getAsociacionesValidadas(){
    return this.http.get(this.validadasURL).map(res=>res.json());
  }

  deleteAsociacion(id, asociacion){
    let body = JSON.stringify(asociacion);
    let urlC = `${this.cancelarURL}${id}`;
    console.log(id);

    let token = sessionStorage.getItem('token');

    console.log(token);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.put(urlC, body, {headers}).map(res=>{
      console.log(res.json());
      return res.json();
    });
  }

  newAsociacion(asociacion:Asociacion){
    let body = JSON.stringify(asociacion);

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post(this.url, body, {headers})
        .map(res=>{
          console.log(res.json());
          return res.json();
        })
  }

  loginAsociacion(json){ //json con email y contrasena
    let body = JSON.stringify(json);

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post(this.loginURL, body, {headers})
        .map(res=>{
          return res.json();
        })
  }

  getAsociacion(id$:number){
    let urlA = `${this.url}${id$}`;
    return this.http.get(urlA).map(res=>res.json());
  }

  activateAsociacion(id, email){
    //body: token de la asociacion(Cabecera) y JSON: email e ID
    let token = sessionStorage.getItem('token');
    email = email.split("'")[1];
    console.log(email);
    let body = JSON.stringify({ID_Asociacion: id, Email: email, });

    console.log(token);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    console.log(body);
    return this.http.post(this.activarURL, body, {headers})
        .map(res=>{
          //console.log(res.json());
          return res.json();
        })
  }

}
