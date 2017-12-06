import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class AsociacionesService {

  constructor(private http:Http) {

  }
  getAsociaciones(){
    let url = "https://www.aisha.ovh/api/asociacion";
    return this.http.get(url).map(res=>res.json());
  }
}
