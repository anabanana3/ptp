import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Solicitante } from '../interfaces/solicitante.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class SolicitanteService {

  usuarioURL:string = "https://www.aisha.ovh/api/solicitantes";

  constructor(private http:Http) {

  }

  nuevoUsuario(usuario:Solicitante){
    let body = JSON.stringify(usuario);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.usuarioURL, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  actualizarUsuario(usu:Solicitante, id$:string){
    let body = JSON.stringify(usu);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.usuarioURL}/${id$}`;

    return this.http.put(url, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  getUsuario(id$:string){
    let url = `${this.usuarioURL}/${id$}`;

    return this.http.get(url).map(res=>
      res.json()
    );
  }

  getUsuarios(){
    return this.http.get(this.usuarioURL).map(res=>res.json());
  }

  borraUsuario(id$:string){
    let url = `${this.usuarioURL}/${id$}`;
    return this.http.delete(url).map(res=>{
      console.log(res.json());
      res.json()});
  }
}
