class TRecursoMalla extends TRecurso{
  constructor(){
    super();
    this.vertices;
    this.normales;  //Float32Array
    this.texturas;

    this.indices;   //Uint16Array

    this.vertTriangulos;
    this.normTriangulos;
    this.textTriangulos;

    this.nTriangulos;
  }

  request(url) {
    return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = function(e){
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
    let request = this.request('/assets/motor/' + nombre).then((obj) => {
      console.log(obj)
      this.vertices = obj.vertices;
      this.normales = obj.vertexNormals;
      this.indices = obj.indices;
      this.texturas = obj.textures;
    })
  }

  initBuffers(modelo){
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
      //texturas
      gl.enableVertexAttribArray(programa.aVertexTextureCoords);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.tb);
      gl.vertexAttribPointer(programa.aVertexTextureCoords, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textura.imagen.texture);
      gl.uniform1i(programa.uSampler, 0);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.ib);
    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
}
