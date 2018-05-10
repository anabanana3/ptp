class TRecursoTextura extends TRecurso{
  constructor(){
    super();
    //this.nombre;
    this.imagen = new Image();
    this.imagen.texture;
  }

  cargarFichero(nombre){
    let gl = GShader.gl;
    let url = '/assets/motor/'+ nombre;
    //window.loading.push(1);
    cargando = true;
    this.imagen.onload = function () {
      this.texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      gl.generateMipmap(gl.TEXTURE_2D);

      //window.loading.pop();
      cargando = false;

      if (!gl.isTexture(this.texture)) {
        console.error("Error: Texture is invalid");
      }

    }
    this.imagen.src = url;
  }

  draw(){
  }
}
