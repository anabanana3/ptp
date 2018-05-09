import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ExpedientesService {

urlEtnias:string = "https://www.aisha.ovh/api/etnia";
urlActividades:string = 'https://www.aisha.ovh/api/actividad';
urlExpediente:string = 'https://www.aisha.ovh/api/expedientes';
urlExpedientePriv:string = 'https://www.aisha.ovh/api/privados';
urlExpedientePub:string = 'https://www.aisha.ovh/api/publicos';
urlPersona:string = 'https://www.aisha.ovh/api/persona';
urlBloque:string = 'https://www.aisha.ovh/api/camposb1';
urlBloque2:string = 'https://www.aisha.ovh/api/camposb2';
urlBloque3:string = 'https://www.aisha.ovh/api/camposb3';
urlBloque4:string = 'https://www.aisha.ovh/api/camposb4';
urlBloque5:string = 'https://aisha.ovh/api/camposb5';
urlPartos:string = 'https://aisha.ovh/api/parto'
urlFamiliar:string = 'https://aisha.ovh/api/familiar';
urlIndicadores:string = 'https://aisha.ovh/api/indicadores';
urlFormulas:string ='https://aisha.ovh/api/formulao';
urlTiposMGF:string ='https://aisha.ovh/api/mutilacion';
//Para obtener los datos
urlCompMadre:string ='https://aisha.ovh/api/compMadre';
urlCompNacido:string ='https://aisha.ovh/api/compNacido';

urlConsecSalud:string ='https://aisha.ovh/api/consecSalud';
//Expedientes de un usuario
urlExp:string = 'https://aisha.ovh/api/privados';
urlTieneComp:string = 'https://aisha.ovh/api/tieneCompM';
urlTieneConsecSalud:string = 'https://aisha.ovh/api/tieneConsecuencias';
urlTieneIndicadores:string = 'https://aisha.ovh/api/tieneIndicadores';
urlPublicar:string = 'https://aisha.ovh/api/privados/publicar';

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

  updatePersona(p, idPer){
    console.log('Actualizo la persona');
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let url = this.urlPersona+'/'+idPer;

    return this.http.put(url, p, {headers}).map(res =>{
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

  updateExpediente(exp, idExp){
    //Metodo para modificar el expediente
    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let url = this.urlExpediente+'/'+idExp;

    return this.http.put(url, exp, {headers}).map(res => {
      console.log(res.json());
      return res.json();
    })
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

  updateBloque(bloque, idE){
    console.log('Actualizo el bloque 1');
    let token =  sessionStorage.token;
    //console.log(token);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    bloque.ID_Expediente=idE;
    let body = JSON.stringify(bloque),
        url = this.urlBloque+'/'+idE;
    return this.http.put(url, body, {headers}).map(res=>{
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

  addBloque2(bloque){
    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this.http.post(this.urlBloque2, bloque, {headers}).map(res=>{
      console.log(res.json());
      return res.json();
    })
  }

  updateBloque2(bloque, idBloque){
    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    console.log('Actualizo el bloque2 Servicio');
    let url = this.urlBloque2+'/'+idBloque;
    console.log(url);

    return this.http.put(url, bloque, {headers}).map(res=>{
      return res.json();
    })
  }

  addParto(parto){
    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this.http.post(this.urlPartos, parto, {headers}).map(res=>{
      console.log(res.json());
      return res.json();
    })
  }

updateParto(parto){
  let token = sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let url = this.urlPartos+'/'+parto.ID_Parto;

  return this.http.put(url, parto, {headers}).map(res=>{
    console.log(res.json());
    return res.json();
  })
}

//Funcion para añadir todas las complicacione que ha selecionado el usuario
  addCompMadreParto(idP, sel){
    let url = this.urlPartos+'/complicacionesMadre/'+idP;
    let token =  sessionStorage.token;
    //console.log(token);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this.http.post(url, sel, {headers}).map(res=> res.json());
  }
//Funcion para añadir todas las complicaciones que ha selecionado el usuario
addCompNacidoParto(idP, sel){
  let url = this.urlPartos+'/complicacionesNacido/'+idP;
  let token =  sessionStorage.token;
  //console.log(token);
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  return this.http.post(url, sel, {headers}).map(res => res.json());
}

updateCompMadreParto(idP, sel){
  let url = this.urlPartos+'/complicacionesMadre/'+idP;
  let token =  sessionStorage.token;
  //console.log(token);
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  return this.http.put(url, sel, {headers}).map(res=>res.json());
}
updateCompNacidoParto(idP, sel){
  let url = this.urlPartos+'/complicacionesNacido/'+idP;
  let token =  sessionStorage.token;
  //console.log(token);
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  return this.http.put(url, sel, {headers}).map(res => res.json());
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

  updatebloque5(bloque){
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let url = this.urlBloque5+'/'+bloque.ID_Expediente;

    return this.http.put(url, bloque, {headers}).map(res=>res.json());
  }
  addBloque3(bloque){
    let body = JSON.stringify(bloque);
    console.log('Muestro lo que recibo en el servicio');
    console.log(bloque);
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this.http.post(this.urlBloque3, body, {headers}).map(res=>{
            console.log(res.json());
            return res.json();
    });
  }

  updateBloque3(bloque){
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let url = this.urlBloque3+'/'+bloque.ID_Expediente;
    return this.http.put(url, bloque , {headers}).map(res=>res.json())
  }
  addBloque4(bloque){
    let body = JSON.stringify(bloque);
    console.log('Muestro lo que recibo en el servicio');
    console.log(bloque);
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this.http.post(this.urlBloque4, body, {headers}).map(res=>{
            return res.json();
    })
  }

  updateBloque4(bloque){
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let url = this.urlBloque4+'/'+bloque.ID_Expediente;
    return this.http.put(url, bloque, {headers}).map(res=>{
            return res.json();
    })
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

  updateIndicadores(exp, bloque, sel){
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let url = `${this.urlBloque5}/indicadores/idB=${bloque}&idE=${exp}`;
    return this.http.put(url, sel,{headers}).map(res=>{
      return res.json();
    })
  }

  getIndicadores(){
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
  getConsecuenciasSalud(){
    return this.http.get(this.urlConsecSalud).map(res=>{
      return res.json();
    })
  }
  addConsecuenciasSalud(exp, bloque, sel){
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let url = `${this.urlBloque4}/consecuencias/id=${exp}&b=${bloque}`;
    return this.http.post(url, sel,{headers}).map(res=>{
      return res.json();
    })
  }

  updateConsecuenciasSalud(exp,bloque,sel){
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let url = `${this.urlBloque4}/consecuencias/id=${exp}&b=${bloque}`;
    return this.http.put(url, sel,{headers}).map(res=>{
      return res.json();
    })
  }

  //Metodo que devuelve TODOS los expedientes de un usuario
  getExpedientesUser(p, tamPag){
    let usuario = sessionStorage.iD;
    // TODO: implementar en la API
    let url=this.urlExpediente+'/usuario/'+usuario+'/pag='+p+'&n='+tamPag;
    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':token
    });
    return this.http.get(url, {headers}).map(res=>{
      return res.json();
    });
  }


  //Metodo que te deevuelve los expedientes privados de un usuario
  getExpedientesPrivUser(p, tamPag){
    let usuario = sessionStorage.iD;
    let url = this.urlExpedientePriv+'/'+usuario+'/pag='+p+'&n='+tamPag;

    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this.http.get(url, {headers}).map(res=>{
      return res.json();
    })

  }

  //Metodo que devuelve los expedientes publicos de un usuario

  //AQUI
  getExpedientesPubUser(p, tamPag){
    let usuario = sessionStorage.iD;
    let url=this.urlExpedientePub+'/usuario/'+usuario+'/pag='+p+'&n='+tamPag;
    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':token
    });
    return this.http.get(url, {headers}).map(res=>{
      return res.json();
    });
  }
  getExpedientesPubById(id){
    let url=this.urlExpedientePub+'/'+id;
    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':token
    });
    return this.http.get(url, {headers}).map(res=>{
      console.log(res.json());
      return res.json();
    });
  }


  buscarExp(f){
    console.log('Llego al servicio y muestro la url que me llega');
    console.log(f);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    return this.http.get(f, {headers}).map(res=>{
      return res;
    })

  }
  buscar2Exp(url){
    console.log('Funcion de prueba de busqueda');
    console.log(url);
    let token = sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    return this.http.get(url, {headers}).map(res =>{
      console.log(res.json());
      return res.json();
    });
  }

  getExpedienteById(id){
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let urlExpId = this.urlExpediente+'/id='+id;
    console.log('hola');

    return this.http.get(urlExpId, {headers}).map(res=>{
      console.log(res.json());
      return res.json();
    })
  }

  getBloque1(id){
    let token =  sessionStorage.token;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });
    let urlb1 = this.urlBloque+'/id='+id;

    return this.http.get(urlb1, {headers}).map(res=>{
      console.log(res.json());
      return res.json();
    })
  }

  getExpedientes(pag, tam){
    let token = sessionStorage.getItem('token');
    let url = this.urlExpediente + '/pag=' + pag + '&n=' + tam;
    console.log(url);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': token
    });

    return this.http.get(url, {headers}).map(res=>res.json());
  }

getBloque2(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let urlb2 = this.urlBloque2+'/'+id;

  return this.http.get(urlb2, {headers}).map(res=>{
    console.log(res.json());
    return res.json();
  })
}

getPartos(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let urlp = this.urlPartos+'/expediente/'+id;

  return this.http.get(urlp, {headers}).map(res=>{
    //console.log("p"+res.json());
    return res.json();
  })
}
getComplicMadreById(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let urlp = this.urlCompMadre+'/'+id;

  return this.http.get(urlp, {headers}).map(res=>{
    //console.log("p"+res.json());
    return res.json();
  })
}
getComplicNacidoById(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let urlp = this.urlCompNacido+'/'+id;

  return this.http.get(urlp, {headers}).map(res=>{
    console.log(res.json());
    return res.json();
  })
}
getConsecM(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let urlc = this.urlTieneComp+'/madre/idM='+id;

  return this.http.get(urlc, {headers}).map(res=>{
    //console.log(res.json());
    return res.json();
  })
}
getConsecN(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let urln = this.urlTieneComp+'/nacido/idN='+id;

  return this.http.get(urln, {headers}).map(res=>{
    //console.log(res.json());
    return res.json();
  })
}

getBloque3(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let urlb3 = this.urlBloque3+'/'+id;

  return this.http.get(urlb3, {headers}).map(res=>{
    //console.log(res.json());
    return res.json();
  })
}

getBloque4(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let urlb4 = this.urlBloque4+'/'+id;

  return this.http.get(urlb4, {headers}).map(res=>{
    //console.log(res.json());
    return res.json();
  })
}

getBloque5(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let urlb5 = this.urlBloque5+'/'+id;

  return this.http.get(urlb5, {headers}).map(res=>{
    //console.log(res.json());
    return res.json();
  })
}

getTieneConsecSalud(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let url = this.urlTieneConsecSalud+'/'+id;
  return this.http.get(url, {headers}).map(res=>{
    //console.log(res.json());
    return res.json();
  })
}
getPersonaById(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let persona = this.urlPersona+'/'+id;
  return this.http.get(persona, {headers}).map(res=>{
    return res.json();
  })
}
getFamiliarPersona(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let persona = this.urlFamiliar+'/'+id;
  return this.http.get(persona, {headers}).map(res=>{
    //console.log(res.json());
    return res.json();
  })
}
getIndicadoresById(id){
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let ind = this.urlTieneIndicadores+'/'+id;
  return this.http.get(ind, {headers}).map(res=>{
    return res.json();
  })
}
publicar(datos){
  let body = JSON.stringify(datos);
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let publico = this.urlPublicar;
  //return this.http.get(publico, {headers}).map(res=>{
  return this.http.post(publico, body, {headers}).map(res=>{
    console.log(res.json());
    return res.json();
  })
}
comentarios(datos){
  let body = JSON.stringify(datos);
  let token =  sessionStorage.token;
  let headers = new Headers({
    'Content-Type':'application/json',
    'Authorization':token
  });
  let publico = this.urlPublicar+'/';//?????
  return this.http.put(publico, body, {headers}).map(res=>{
    console.log(res.json());
    return res.json();
  })
}
}
