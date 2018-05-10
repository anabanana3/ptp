class TMalla extends TEntidad{

  constructor(){
    super();
    this.malla = null;
    this.material = null;
    this.textura = null;
  }

  getMalla(){
    return this.malla;
  }

  isPowerOf2(img){
    return (img & (img - 1)) == 0;
  }

  beginDraw(){
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

    var angle = this.angle * Math.PI/180;
    gl.uniformMatrix4fv(programa.ModelViewMatrix, false, modelViewMatrix);

    // normal matrix
    let normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);
    gl.uniformMatrix4fv(programa.NormalMatrix, false, normalMatrix);
    console.log(this.textura);
    this.malla.draw(this.textura);

  }

  endDraw(){

  }

}
