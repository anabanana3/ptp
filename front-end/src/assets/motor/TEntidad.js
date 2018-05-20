class TEntidad {
  //creamos clase virtual de la que heredan todos los tipos de entidad
  
  constructor(){
    this.modelMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
  }

  beginDraw(){}
  endDraw(){}
}
