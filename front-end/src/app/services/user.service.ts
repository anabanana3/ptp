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
  activarURL:string = "https://www.aisha.ovh/api/mail/send";
  mensajeURL:string = "https://www.aisha.ovh/api/mail/send/contacto";
  loginURL2:string = "https://www.aisha.ovh/api/login";
  visitasURL:string = "https://www.aisha.ovh/api/logs";

  constructor(private http:Http) { }

  newUsuario(usuario:User){
    let body = JSON.stringify(usuario);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.usuariosURL, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  // TODO: Falta implementarlo en la API
  updateUsuario(usuario){
    let token = sessionStorage.token;
    let url = this.usuariosURL + 'upload/'+token;
    return this.http.post(url, usuario).map(res=>res.json())
  }

  updateUsuario2(usu, id){
    let body = JSON.stringify(usu);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.usuariosURL}${id}`;

    return this.http.put(url, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  updateRegistrado(usu, id){
    let body = JSON.stringify(usu);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${this.registradosURL}${id}`;

    return this.http.put(url, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  getUsuario(id$:number){
    let url = `${this.usuariosURL}${id$}`;
    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>
      res.json()
    );
  }

  getUsuarios(numPag, tamPag){
    let url = `${this.usuariosURL}pag=${numPag}&n=${tamPag}`;
    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  deleteUsuario(id){
    let urlD = `${this.solicitantesURL}cancelar/${id}`;

    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.delete(urlD, {headers}).map(res=>{
      return res.json()});
  }

  login(json){
    let body =JSON.stringify(json);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    return this.http.post(this.loginURL2, body, {headers}).map(res =>{
      return res.json();
    })
  }

  getUsuarioSolicitantesAsociacion(id, numPag, tamPag){
    let url = `${this.solicitantesURL}asociacion/${id}/pag=${numPag}&n=${tamPag}`;
    let token = sessionStorage.getItem('token');
    console.log(url);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  getUsuarioRegistradosAsociacion(id$:number, numPag, tamPag){
    let url = `${this.registradosURL}asociacion/${id$}/pag=${numPag}&n=${tamPag}`;
    let token = sessionStorage.getItem('token');
    console.log(url);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  getSolicitantes(numPag, tamPag){
    let url = `${this.solicitantesURL}pag=${numPag}&n=${tamPag}`;
    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  getRegistrados(numPag, tamPag){
    let url = `${this.registradosURL}pag=${numPag}&n=${tamPag}`;
    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  getCancelados(numPag, tamPag){
    let url = `${this.canceladosURL}pag=${numPag}&n=${tamPag}`;
    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  activateUsuario(id, email){
    //body: token de la asociacion(Cabecera) y JSON: email e ID
    let token = sessionStorage.getItem('token');
    email = email.split("'")[1];
    console.log('id: '+id+' email: '+email);
    let body = JSON.stringify({ID_Usuario: id, Email: email, });

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.post(this.activarURL, body, {headers})
        .map(res=>{
          console.log(res.json());
          return res.json();
        })
  }

  registrarSolicitante(json){
    let body = JSON.stringify(json);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.registradosURL, body, {headers}).map(res=>{
      console.log(res.json());
      return res.json();
    })
  }

  sendEmail(json){
    let body = JSON.stringify(json);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.mensajeURL, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  filtroUsuarios(tabla, nombre, email, profesion, numPag, tamPag){
    let urlAPI:string = "https://aisha.ovh/api/";
    let url;
    if(tabla === 0)
      url = `${urlAPI}solicitantes/search/Nombre=${nombre}&Email=${email}&Profesion=${profesion}/pag=${numPag}&n=${tamPag}`;
    else if(tabla === 1)
      url = `${urlAPI}registrados/search/Nombre=${nombre}&Email=${email}&Profesion=${profesion}/pag=${numPag}&n=${tamPag}`;
    else if(tabla === 2)
      url = `${urlAPI}cancelados/search/Nombre=${nombre}&Email=${email}&Profesion=${profesion}/pag=${numPag}&n=${tamPag}`;

    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }
  visitasWeb(json){
    let body =JSON.stringify(json);
    let token = sessionStorage.getItem('token');
    let visitas = this.visitasURL + "/visitas";
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    return this.http.post(visitas, body, {headers}).map(res =>{
      console.log(res.json());
      return res.json();
    })
  }
  visitasModelo3D(json){
    let body =JSON.stringify(json);
    let token = sessionStorage.getItem('token');
    let visitas = this.visitasURL + "/modelo3D";
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    return this.http.post(visitas, body, {headers}).map(res =>{
      console.log(res.json());
      return res.json();
    })
  }


}
