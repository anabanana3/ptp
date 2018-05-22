class TRecursoTextura extends TRecurso{
  //nos hemos basado en el capitulo 7 del libro webgl (texturas) - pag 225
  //tambien https://webglfundamentals.org/webgl/lessons/webgl-3d-textures.html
  constructor(){
    super();
    //this.nombre;
    this.imagen = new Image();
    this.imagen.texture;
  }
  //cargamos la textura que le pasamos
  cargarFichero(nombre){
    let gl = GShader.gl;
    //creamos la url, para que se coja el archivo correcto
    let url = '/assets/motor/'+ nombre;

    //creamos una variable para que espere a que se cargue la textura para continuar
    cargando = true;
    //cargamos la imagen y creamos la textura
    this.imagen.onload = function () {
      this.texture = gl.createTexture();
      //activamos la textura y la asignamos
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      //añadimos la imagen a la textura
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST); //LINEAR_MIPMAP_NEAREST
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.generateMipmap(gl.TEXTURE_2D);

      //para que continue el resto del programa cuando ya se ha cargado
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
