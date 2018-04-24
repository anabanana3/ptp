class TMalla extends TEntidad{

  constructor(){
    super();
    this.malla = null;
    this.material = null;

  }

  getMalla(){
    return this.malla;
  }

  beginDraw(){
    console.log(GShader);
    console.log(this);
    console.log(this.malla);
    let gl = GShader.gl;
    let programa = GShader.programa;
    gl.uniform4fv(programa.uMaterialDiffuse, this.material.colorDifuso);
    gl.uniform4fv(programa.uMaterialSpecular, this.material.colorEspecular);
    gl.uniform4fv(programa.uMaterialAmbient, this.material.colorAmbiente);
    gl.uniform1f(programa.uShininess, this.material.uShininess);

    //projection matrix
    // mat4.perspective(45, this.canvas.width/this.canvas.height, 0.1, 10000.0, GProjectionMatrix);
    gl.uniformMatrix4fv(programa.ProjectionMatrix, false, GProjectionMatrix);

    //model view matrix
    GModelViewMatrix = mat4.create();
    mat4.multiply(GModelViewMatrix, this.modelMatrix, GViewMatrix);
    var angle = this.angle * Math.PI/180;
    // mat4.rotate(GModelViewMatrix, angle, [0, 1, 0]);
    gl.uniformMatrix4fv(programa.ModelViewMatrix, false, GModelViewMatrix);

    // normal matrix
    GNormalMatrix = mat4.create();
    mat4.invert(GNormalMatrix, GModelViewMatrix);
    mat4.transpose(GNormalMatrix, GNormalMatrix);
    gl.uniformMatrix4fv(programa.NormalMatrix, false, GNormalMatrix);

    this.malla.draw();

  }

  endDraw(){

  }

}
