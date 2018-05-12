import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Recurso } from '../interfaces/recurso.interface';
import 'rxjs/add/operator/map'; //no lo dice en los tutoriales->para que funcione el .map

@Injectable()
export class MaterialService {
  material:string = "https://aisha.ovh/api/material/";
  materialesPropios:string = "https://aisha.ovh/api/material/usuario/";
  materialesPublicos:string = "https://aisha.ovh/api/material/publicos/";
  formatos:string = "https://aisha.ovh/api/formato/";
  search:string = "https://www.aisha.ovh/api/material/search/";
  publicar:string = "https://www.aisha.ovh/api/material/publicar/";
  materialByUser:string = "https://aisha.ovh/api/material/pub/user/";

  constructor(private http:Http) { }

  newMaterial(material:FormData){
    let body = material;
    let token = sessionStorage.getItem('token');
    let url = this.material + token;

    return this.http.post(url, body).map(res=>{
            console.log(res.json());
            return res.json();
          })
  }

  getFormatos(){
    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(this.formatos, {headers}).map(res=>res.json());
  }

  getMaterialesPropios(pag, tam){
    let token = sessionStorage.getItem('token');
    let id = sessionStorage.getItem('iD');
    let url = this.materialesPropios + id + '/pag=' + pag + '&n=' + tam;
    console.log(url);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  getMaterialesPublicos(pag, tam){
    let token = sessionStorage.getItem('token');
    let url = this.materialesPublicos + 'pag=' + pag + '&n=' + tam;
    console.log(url);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  getMateriales(pag, tam){
    let token = sessionStorage.getItem('token');
    let url = this.material + 'pag=' + pag + '&n=' + tam;
    console.log(url);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  getMaterial(id){
    let token = sessionStorage.getItem('token');
    let idUser = sessionStorage.getItem('iD');
    let url = this.material + 'id/' + id;
    console.log(url);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  searchMaterialPropios(nombre, formato, e, pag, n){
    let url = this.search+ 'user/nombre=' + nombre + '&formato=' + formato + '&e=' + e + '/pag=' + pag + '&n=' + n;
    let token = sessionStorage.getItem('token');
    console.log(url);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  searchMaterialPublicos(nombre, formato, e, pag, n){
    let url = this.search+ 'nombre=' + nombre + '&formato=' + formato + '&e=' + e + '/pag=' + pag + '&n=' + n;
    let token = sessionStorage.getItem('token');
    console.log(url);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

  deleteMaterial(id, path){
    //body path
    let body = JSON.stringify({"Path": path});
    let url = `${this.material}delete/${id}`;
    console.log(id);
    console.log(path);
    console.log(url);

    let token = sessionStorage.getItem('token');

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.post(url, body, {headers}).map(res=> res.json());
  }

  updateMaterial(id, material){
    //id y body
    //titulo descripcion y publico

    let body = JSON.stringify(material);
    let url = `${this.material}${id}`;
    console.log(id);
    console.log(body);
    console.log(url);

    let token = sessionStorage.getItem('token');

    console.log(token);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.put(url, body, {headers}).map(res=>{
      console.log(res.json());
      return res.json();
    });
  }

  publicarMaterial(id){
    let token = sessionStorage.getItem('token');

    console.log(token);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.post(this.publicar, {headers}).map(res=> res.json());
  }

  getMaterialesByUser(idUser){
    let url = this.materialByUser + idUser;
    let token = sessionStorage.getItem('token');
    console.log(url);

    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }
}
