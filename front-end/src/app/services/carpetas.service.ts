import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../interfaces/user.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class CarpetasService {

  carpetaExpURL:string ='https://aisha.ovh/api/carpeta/exp';
  carpetaExpURL2:string ='https://aisha.ovh/api/carpeta/exp1';

  constructor(private http:Http) { }

  getRaizUser(id){
    let token = sessionStorage.token,
        url = this.carpetaExpURL2+'/user/'+id,
        headers = new Headers({
          'Content-Type':'application/json',
          'Authorization': token
        });
        return this.http.get(url, {headers}).map(res => res.json());
  }

  getCarpeta(id){
    let token = sessionStorage.token,
        url = this.carpetaExpURL2+'/carpeta/'+id,
        headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
        });
        return this.http.get(url, {headers}).map(res=> res.json());
  }

  getCarpetasUser(idU, tamPag, pag){
    let token = sessionStorage.token,
        url = this.carpetaExpURL+'/user/'+idU+'/pag='+pag+'&n='+tamPag,
        headers = new Headers({
          'Content-Type':'application/json',
          'Authorization': token
        });
        return this.http.get(url, {headers}).map(res => res.json());
  }

  newCarpeta(nombre, idCarpetaActual){
    let token = sessionStorage.token,
    headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let body = {
      ID_Usuario: sessionStorage.iD,
      Nombre: nombre,
      Padre: idCarpetaActual,
      };

    return this.http.post(this.carpetaExpURL2, body, {headers}).map(res => res.json());

  }

  updateCarpeta(nombre,idC){
    let token = sessionStorage.token,
    headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let url = this.carpetaExpURL2+'/'+idC;

    let body = {
      ID_Carpeta: idC,
      Nombre: nombre
    };
    return this.http.put(url, body, {headers}).map(res => res.json());


  }

  deleteCarpeta(idC){
    let token = sessionStorage.token,
    headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    //Falta poner el tipo de borrado
    let url = this.carpetaExpURL2+'/delete/idC='+idC+'&t=1&u='+sessionStorage.iD;

    return this.http.delete(url, {headers}).map(res=> res.json());
  }

  addExpedienteToFolder(idExp, idCarpeta){
    let token = sessionStorage.token,
    headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let url = this.carpetaExpURL2+'/add';
    return this.http.post(url, {headers}).map(res=>{
      return res.json();
    })

  }

}
