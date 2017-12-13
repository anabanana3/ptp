import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Solicitante } from '../interfaces/solicitante.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class SolicitanteService {

  solicitantesURL:string = "https://www.aisha.ovh/api/solicitantes/";
  usuariosURL:string = "https://www.aisha.ovh/api/usuario/";

  constructor(private http:Http) {

  }

  nuevoUsuario(usuario:Solicitante){
    let body = JSON.stringify(usuario);

    console.log(body);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.usuariosURL, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  actualizarUsuario(usu:Solicitante, id$:string){
    let body = JSON.stringify(usu);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.solicitantesURL}/${id$}`;

    return this.http.put(url, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  getUsuario(id$:string){
    let url = `${this.solicitantesURL}/${id$}`;

    return this.http.get(url).map(res=>
      res.json()
    );
  }

  getUsuarios(){
    return this.http.get(this.usuariosURL).map(res=>res.json());
  }

  deleteUsuario(id){
    let urlD = `${this.solicitantesURL}cancelar/${id}`;

    return this.http.delete(urlD).map(res=>{
      console.log(res.json());
      res.json()});
  }

  getUsuarioAsociacion(id$:number){
    let url = `${this.solicitantesURL}/asociacion/${id$}`;
    return this.http.get(url).map(res=>res.json());
  }
}
