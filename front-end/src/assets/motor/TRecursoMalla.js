class TRecursoMalla extends TRecurso{
  /*
  Clase TRecursoMalla, la cual se crear al asignar un TRecurso de una malla
  añadimos a este recurso todas las caracteristicas necesarias para luego pasarle al shader.
  */
  constructor(){
    super();
    this.vertices;
    this.indices;   //Uint16Array
    this.normales;  //Float32Array
    this.texturas;
  }

  request(url) {
    /*
    Creamos una promesa la cual cuando acabamos de cargar el fichero .obj devuelve el resultado
    necesario por la sincronicidad de JS
    */
    return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = function(e){
        //aqui llamamos a la funcion de cargaobj.js que nos devuelve los datos que queremos
        let obj = new OBJ.Mesh(e.target.response);
        resolve(obj);
      };
      req.onerror = function (e) {
        console.log(e);
      };
      req.send();
    });
  }

  cargarFichero(nombre){
    //llamamos al metodo anterior request pasandole por parametro la ruta del archivo
    let request = this.request('/assets/motor/' + nombre).then((obj) => {
      this.vertices = obj.vertices;
      this.normales = obj.vertexNormals;
      this.indices = obj.indices;
      this.texturas = obj.textures;
    })
  }

  initBuffers(modelo){
    //iniciamos los buffers a partir de un modelo
    let gl = GShader.gl;
    //vertices
    let vertexBuffer  = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW); //TO DO
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //indices
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    //normales
    let normalBuffer  = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normales), gl.STATIC_DRAW); //TO DO
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    let textureBuffer = null;
    //texturas
    if (this.texturas.length > 0) {
      textureBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texturas), gl.STATIC_DRAW); //TO DO
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    let buffer = {
      vb: vertexBuffer,
      ib: indexBuffer,
      nb: normalBuffer,
      tb: textureBuffer
    };
    return buffer;
  }

  draw(textura){
    /*
    Aqui añadimos la informacion correspondiente de los datos del modelo pasando además la textura asignada
    creamos los buffers y añadimos al program del shader.
    */
    //llamada al metodo anterior
    let buffers = this.initBuffers(this);
    let programa = GShader.programa;
    //vertices
    gl.enableVertexAttribArray(programa.aVertexPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vb);
    gl.vertexAttribPointer(programa.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    //normales
    gl.enableVertexAttribArray(programa.aVertexNormal);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.nb);
    gl.vertexAttribPointer(programa.aVertexNormal, 3, gl.FLOAT, false, 0, 0);

    if(textura !== null && cargando == false && GCartoon == false){
      /*
      comprobamos que el modelo que queremos mostrar tiene textura o no para mostrarlo,
      debido a que podemos querer un modelo con textura o sin.
      */
      gl.enableVertexAttribArray(programa.aVertexTextureCoords);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.tb);
      gl.vertexAttribPointer(programa.aVertexTextureCoords, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textura.imagen.texture);
      gl.uniform1i(programa.uSampler, 0);
    }

    //pintamos
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.ib);
    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
}
