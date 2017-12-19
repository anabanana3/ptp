import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../interfaces/user.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class UserService {

  solicitantesURL:string = "https://www.aisha.ovh/api/solicitantes/";
  canceladosURL:string = "https://www.aisha.ovh/api/cancelados/";
  registradosURL:string = "https://www.aisha.ovh/api/registrados/";
  usuariosURL:string = "https://www.aisha.ovh/api/usuario/";
  loginURL:string = "https://www.aisha.ovh/api/registrados/signin";

  constructor(private http:Http) { }

  newUsuario(usuario:User){
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

  updateUsuario(usu:User, id$:string){
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

  getUsuario(id$:number){
    let url = `${this.usuariosURL}${id$}`;

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

  getSolicitantes(){
    return this.http.get(this.solicitantesURL).map(res=>res.json());
  }

  getRegistrados(){
    return this.http.get(this.registradosURL).map(res=>res.json());
  }

  getCancelados(){
    return this.http.get(this.canceladosURL).map(res=>res.json());
  }
}
