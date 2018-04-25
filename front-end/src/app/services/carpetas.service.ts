import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../interfaces/user.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class CarpetasService {

  carpetaExpURL:string ='https://aisha.ovh/api/carpeta/exp';

  constructor(private http:Http) { }

  getCarpetasUser(idU, tamPag, pag){
    let token = sessionStorage.token,
        url = this.carpetaExpURL+'/user/'+idU+'/pag='+pag+'&n='+tamPag,
        headers = new Headers({
          'Content-Type':'application/json',
          'Authorization': token
        });
        return this.http.get(url, {headers}).map(res => res.json());
  }

  newCarpeta(nombre){
    let token = sessionStorage.token,
    headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let body = {
      ID_Usuario: sessionStorage.iD,
      Nombre: nombre
    };

    return this.http.post(this.carpetaExpURL, body, {headers}).map(res => res.json());

  }

  deleteCarpeta(idC){
    let token = sessionStorage.token,
    headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });
    let url = this.carpetaExpURL+'/'+idC;

    return this.http.delete(url, {headers}).map(res=> res.json());
  }

}
