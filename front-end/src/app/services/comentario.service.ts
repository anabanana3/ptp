import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ComentarioService {
  comentario:string = "https://aisha.ovh/api/comentarios";
  comentarioExpediente:string = "https://aisha.ovh/api/comentarios/expediente";

  constructor(private http:Http) { }

  newComentario(comentario){
    let body = JSON.stringify(comentario);
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':  token
    });

    return this.http.post(this.comentario, body, {headers}).map(res=>{
      return res.json();
    })
  }

  getComentariosByExpediente(idExpediente, pag, tamPag){
    let url = this.comentarioExpediente + '/' + idExpediente + '/pag=' + pag + '&n=' + tamPag;

    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':  token
    });

    return this.http.get(url, {headers}).map(res=>{
      return res.json();
    });
  }

  updateComentario(idExpediente, idComentario, comentario){
    let url = this.comentario + '/' + idComentario + '/' + idExpediente;

    let body = JSON.stringify(comentario);
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':  token
    });

    return this.http.put(url, body, {headers}).map(res=>{
      return res.json();
    })
  }

  deleteComentario(idExpediente, idComentario){
    let url = this.comentario + '/' + idComentario + '/' + idExpediente;

    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':  token
    });

    return this.http.delete(url, {headers}).map(res=>{
      return res.json();
    });
  }
}
