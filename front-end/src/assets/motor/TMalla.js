class TMalla extends TEntidad{
  /*
  La clase TMalla es un tipo de entidad, por ello hereda de ella
  la entidad malla tiene, un recurso malla, un recurso material y un recurso textura.
  */
  constructor(){
    super();
    this.malla = null;
    this.material = null;
    this.textura = null;
  }

  getMalla(){
    return this.malla;
  }

  getMaterial(){
    return this.material;
  }

  getTextura(){
    return this.textura;
  }

  isPowerOf2(img){
    return (img & (img - 1)) == 0;
  }

  beginDraw(){
    if(!GAnimacion){
      //cuando hacemos este beginDraw estamos asignando los valores al shader
      let gl = GShader.gl;
      let programa = GShader.programa;

      gl.uniform4fv(programa.uMaterialDiffuse, this.material.colorDifuso);
      gl.uniform4fv(programa.uMaterialSpecular, this.material.colorEspecular);
      gl.uniform4fv(programa.uMaterialAmbient, this.material.colorAmbiente);
      gl.uniform1f(programa.uShininess, this.material.uShininess);

      //projection matrix
      gl.uniformMatrix4fv(programa.ProjectionMatrix, false, GFachada.regCamaras[0].entidad.projectionMatrix);

      //model view matrix
      let modelViewMatrix = mat4.create();
      mat4.multiply(modelViewMatrix, this.modelMatrix, GFachada.regCamaras[0].entidad.viewMatrix);
      gl.uniformMatrix4fv(programa.ModelViewMatrix, false, modelViewMatrix);

      // normal matrix
      let normalMatrix = mat4.create();
      mat4.invert(normalMatrix, modelViewMatrix);
      mat4.transpose(normalMatrix, normalMatrix);
      gl.uniformMatrix4fv(programa.NormalMatrix, false, normalMatrix);

      /*
      aqui estamos llamando al metodo draw de TRecursoMalla para que finalmente pinte la malla
      (pasandole la textura por parametro)
      */
      this.malla.draw(this.textura);
    }
  }

  endDraw(){}

}
