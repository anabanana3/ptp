class TGestorRecursos{
//esta clase la hemos creado basandonos en las transparecias y lo explicado en clase
  constructor(){
    this.recursos = [];
  }

  getRecurso(nombre, tipo){
    var recurso;
    //comprobamos si ya tenemos el recurso en memoria
    for(let i=0; i<this.recursos.length; i++){
      if(this.recursos[i].nombre == nombre){
        recurso = this.recursos[i];
        return recurso;
      }
    }
    //si no lo tenemos
    //creamos el recurso segun el tipo
    if(tipo == "malla"){
      recurso = new TRecursoMalla();
      //llamamos a cargar el recurso
      recurso.cargarFichero(nombre);
      //lo añadimos al array de recursos
      this.recursos.push(recurso);

    }else if(tipo == "textura"){
      recurso = new TRecursoTextura();
      recurso.cargarFichero(nombre);
      this.recursos.push(recurso);

    }else if(tipo == "material"){
      recurso = new TRecursoMaterial();
      recurso.cargarFichero(nombre);
      this.recursos.push(recurso);
    }
    //devolvemos el recuro
    return recurso;
  }
}
