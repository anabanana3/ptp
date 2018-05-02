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
    console.log(img);
    console.log((img & (img - 1)) == 0);
    return (img & (img - 1)) == 0;
  }

  beginDraw(){
    console.log(GShader);
    console.log(this);
    console.log(this.malla);
    let gl = GShader.gl;
    let programa = GShader.programa;
    //texturas
    let textura = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    let image = new Image();
    image.onload = function(){
      gl.bindTexture(gl.TEXTURE_2D, textura);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      let isPowerOf2Height = (image.height & (image.height - 1)) == 0;
      let isPowerOf2Width = (image.width & (image.width - 1)) == 0;
      console.log(isPowerOf2Height);
      if (isPowerOf2Height && isPowerOf2Width) {
         gl.generateMipmap(gl.TEXTURE_2D);
      } else {
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      }
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    image.src= GTexturaImg;
    console.log(image);
    GTextura = textura;

    gl.uniform4fv(programa.uMaterialDiffuse, this.material.colorDifuso);
    gl.uniform4fv(programa.uMaterialSpecular, this.material.colorEspecular);
    gl.uniform4fv(programa.uMaterialAmbient, this.material.colorAmbiente);
    gl.uniform1f(programa.uShininess, this.material.uShininess);

    //projection matrix
    // mat4.perspective(45, this.canvas.width/this.canvas.height, 0.1, 10000.0, GProjectionMatrix);
    gl.uniformMatrix4fv(programa.ProjectionMatrix, false, GProjectionMatrix);

    //model view matrix
    GModelViewMatrix = mat4.create();
    let viewMatrix = mat4.create();
    console.log(GFachada.regCamaras[0]);
    let rotaCam = GFachada.regCamaras[0].getPadre().getPadre().entidad.modelMatrix;
    let traslaCam = GFachada.regCamaras[0].getPadre().entidad.modelMatrix;
    mat4.multiply(viewMatrix, rotaCam, traslaCam);
    mat4.multiply(GModelViewMatrix, this.modelMatrix, viewMatrix);
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
