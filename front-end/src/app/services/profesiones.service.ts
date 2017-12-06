import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class ProfesionesService {

  constructor(private http:Http) {

  }
  getProfesiones(){
    let url = "https://www.aisha.ovh/api/profesion";
    return this.http.get(url).map(res=>res.json());
  }
}
