import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class NoticiasService {

  constructor(private http:Http) { }

  getNoticias(){
    let url = "https://www.aisha.ovh/fibbe/wp-json/wp/v2/posts";
    return this.http.get(url).map(res=>res.json());
  }

  getPhoto(url){
    return this.http.get(url).map(res=>res.json());
  }


}
