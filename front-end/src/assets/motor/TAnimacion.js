class TAnimacion extends TEntidad {

  constructor(){
    super();
    this.mallas = [];
    this.lastTime = new Date().getSeconds();
    this.time = new Date().getSeconds();
    this.currentFrame = 0;
    this.frameTime = 4; //1 frame cada segundo
  }

  loadAnimacion(carpeta, padre){
    for(let i = 0; i<4; i++){
      let malla = {
        malla: {},
        material: {},
        textura: {}
      }

      malla.malla = GFachada.gestor.getRecurso(carpeta + "/" + i + ".obj", "malla");
      malla.material = GFachada.gestor.getRecurso("VaginaCarne.mtl", "material");
      // malla.textura = GFachada.gestor.getRecurso("textura.jpg", "textura");
      malla.textura = null;
      console.log(malla);
      this.mallas.push(malla);
    }
  }

  beginDraw(){
    if(this.currentFrame + 1 === this.mallas.length){
        quitarAnimacion();
        return;
    }

    // console.log(this.currentFrame);

    let malla = this.mallas[this.currentFrame]
    let gl = GShader.gl;
    let programa = GShader.programa;
// console.log(malla.material);
    gl.uniform4fv(programa.uMaterialDiffuse, malla.material.colorDifuso);
    gl.uniform4fv(programa.uMaterialSpecular, malla.material.colorEspecular);
    gl.uniform4fv(programa.uMaterialAmbient, malla.material.colorAmbiente);
    gl.uniform1f(programa.uShininess, malla.material.uShininess);

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

    let segundos = new Date().getSeconds();
    this.time = segundos;

    if((this.time - this.lastTime) >= this.frameTime){
      console.log('siguiente frame');
      // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      this.currentFrame ++;
      this.lastTime = this.time;
    }

    this.mallas[this.currentFrame].malla.draw(malla.textura);
  }
}
