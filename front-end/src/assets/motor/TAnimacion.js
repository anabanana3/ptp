class TAnimacion extends TEntidad {
  /*
  La clase TAnimacion es un tipo de entidad, por ello hereda de ella
  la entidad animacion tiene, un array de mallasy lo necesario para cambiar el frame
  a mostrar y correr el reloj.
  */
  constructor(){
    super();
    this.mallas = [];
    this.lastTime = new Date().getSeconds();
    this.time = new Date().getSeconds();
    this.currentFrame = 0;
    this.frameTime = 4; //1 frame cada segundo
  }

  loadAnimacion(carpeta, padre){
    //cargamos la animacion, hacemos un bucle para cargar cada modelo de la carpeta de la animacion
    for(let i = 0; i<4; i++){
      //cada modelo tiene una malla, un material y una textura
      let modelo = {
        malla: {},
        material: {},
        textura: {}
      }

      modelo.malla = GFachada.gestor.getRecurso(carpeta + "/" + i + ".obj", "malla");
      modelo.material = GFachada.gestor.getRecurso("VaginaCarne.mtl", "material");
      // malla.textura = GFachada.gestor.getRecurso("textura.jpg", "textura");
      modelo.textura = null;
      console.log(modelo);
      this.mallas.push(modelo);
    }
  }

  beginDraw(){
    //añadimos al program los datos de los materiales
    if(this.currentFrame + 1 === this.mallas.length){
      /*
      cuando vamos a pintar el ultimo frame, paralizamos la ejecucion
      quitarAnimacion -> funcion que esta en funciones.js que para la animacion y muestra
      el modelo por defecto
      */
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

    //cambiamos el tiempo al actual
    let segundos = new Date().getSeconds();
    this.time = segundos;

    if((this.time - this.lastTime) >= this.frameTime){
      /*
      en este if comprobamos si ha pasado el tiempo que hemos indicado como frameTime
      para mostrar el siguiente frame
      */
      console.log('siguiente frame');
      // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      this.currentFrame ++;
      this.lastTime = this.time;
    }

    //llamamos al draw de TRecursoMalla para añadir el modelo del frame correspondiente y la textura
    this.mallas[this.currentFrame].malla.draw(malla.textura);
  }
}
