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
    //texturas
    let textura = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    let image = new Image();
    image.src= GTexturaImg;
    image.onload = function(){
      gl.bindTexture(gl.TEXTURE_2D, textura);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      let isPowerOf2Height = (image.height & (image.height - 1)) == 0;
      let isPowerOf2Width = (image.width & (image.width - 1)) == 0;
      console.log(isPowerOf2Height);
      console.log(isPowerOf2Width);
      /*if (isPowerOf2Height && isPowerOf2Width) {
         gl.generateMipmap(gl.TEXTURE_2D);
      } else {*/
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      //}
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    console.log(image);
    GTextura = textura;

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
    this.malla.draw();

  }

  endDraw(){

  }

}
