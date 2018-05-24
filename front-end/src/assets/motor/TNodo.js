class TNodo {
  /*
  la clase nodo la cual tiene una entidad, un padre e hijos
  le hemos añadido la propiedad nombre para poder hacer un mejor debug del arbol
  */
  constructor(nombre, padre) {
    this.entidad = null;
    this.hijos = new Array();
    this.nombre = nombre;

    if(padre !== undefined){
      this.padre = padre;
      this.padre.addHijo(this);
    }
  }

  addHijo(hijo){
    this.hijos.push(hijo);
  }

  removeHijos(){
    for(let i=0; i<this.hijos.length; i++){
      this.hijos[i].removeHijos();
      this.hijos[i] = 0;
    }
    this.hijos.length = 0;
  }

  removeHijo(hijo){
    for(let i=0; i<this.hijos.length; i++){
      if(this.hijos[i] === hijo){
        this.hijos[i].removeHijos();
        this.hijos.splice(i, 1);

        return;
      }
    }
  }

  setEntidad(entidad){
    this.entidad = entidad;
  }

  getEntidad(){
    return this.entidad;
  }

  getPadre(){
    return this.padre;
  }

  draw(){
    /*
    en el método draw además de llamar al método pintar correspondiente de la Entidad recorremos
    todos sus nodos hijos para llamar a su draw correspondiente y de esta forma pintar el árbol
    */
    if(this.entidad != null){
      this.entidad.beginDraw();
    }

    for(let i = 0; i<this.hijos.length; i++){
      this.hijos[i].draw();
    }

    if(this.entidad != null){
      this.entidad.endDraw();
    }
  }
}
