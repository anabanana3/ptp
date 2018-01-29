import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ExpedientesService {

urlEtnias:string = "https://www.aisha.ovh/api/etnia";
urlActividades:string = 'https://www.aisha.ovh/api/actividad';
urlExpediente:string = 'https://www.aisha.ovh/api/expedientes';
urlPersona:string = 'https://www.aisha.ovh/api/persona';
urlBloque:string = 'https://www.aisha.ovh/api/camposb1';
urlBloque5:string = 'https://aisha.ovh/api/camposb5';
urlFamiliar:string = 'https://aisha.ovh/api/familiar';
urlIndicadores:string = 'https://aisha.ovh/api/indicadores';
urlFormulas:string ='https://aisha.ovh/api/formulao';
urlTiposMGF:string ='https://aisha.ovh/api/mutilacion';
urlCompMadre:string ='https://aisha.ovh/api/compMadre';
urlCompNacido:string ='https://aisha.ovh/api/compNacido';
  constructor(private http:Http) { }

  getEtnias(){
    return this.http.get(this.urlEtnias).map(res=>{
      console.log(res.json());
      return res.json();
    })
  }

  getActividades(){
    return this.http.get(this.urlActividades).map(res=>res.json());
  }

  addPersona(menor){
    //Creo la persona
    console.log('Creando a la persona estoy en el service')
    let persona = JSON.stringify(menor);
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this.http.post(this.urlPersona, persona,{headers}).map(res=>{
      return res.json();
    })
  }

  addExpediente(exp){
    //creo el expediente
    let token =  sessionStorage.token;
    //console.log(token);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    console.log(exp);
    let body = JSON.stringify(exp);
    console.log(body);
    return this.http.post(this.urlExpediente,body,{headers}).map(res=>{
      console.log('Creando un expediente')
      console.log(res.json());
      return res.json();
    });
  }

  addBloque(bloque, idE){
    let token =  sessionStorage.token;
    //console.log(token);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    bloque.ID_Expediente=idE;
    console.log('Muestro lo que llega al servicio como bloque')
    let body = JSON.stringify(bloque);
    console.log(body);
    //Hago la peticion al servidor
    return this.http.post(this.urlBloque, body, {headers}).map(res=>{
      return res.json();
    })

  }

  addFamiliar(persona, familiar, tipo){
    let body={
      ID_Persona:parseInt(persona),
      ID_Familiar:parseInt(familiar),
      Tipo:parseInt(tipo)
    };
    let token =  sessionStorage.token;
    //console.log(token);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this.http.post(this.urlFamiliar, body, {headers}).map(res=>{
      return res.json();
    })

  }

  addbloque5(bloque){
    console.log('Muestro lo que recibo en el servicio');
    console.log(bloque);
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let body = JSON.stringify(bloque);

    // return this.http.post(this.urlBloque5, body, {headers}).map(res=>{
    //   return res.json();
    // })
    return this.http.post(this.urlBloque5, body, {headers}).map(res=>{
      return res.json();
    });
  }

  addIndicadores(exp, bloque, sel){
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let url = `${this.urlBloque5}/indicadores/idB=${bloque}&idE=${exp}`;
    return this.http.post(url, sel,{headers}).map(res=>{
      return res.json();
    })
  }

  getIdicadores(){
    return this.http.get(this.urlIndicadores).map(res=>{
      return res.json();
    })
  }

  getFormulasObstreticas(){
    return this.http.get(this.urlFormulas).map(res=>{
      return res.json();
    })
  }
  getTipoMutilacion(){
    return this.http.get(this.urlTiposMGF).map(res=> res.json());
  }
getCompMadre(){
  return this.http.get(this.urlCompMadre).map(res=> res.json());
}
getCompNacido(){
  return this.http.get(this.urlCompNacido).map(res=> res.json());
}

}
