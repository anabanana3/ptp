class TRecursoTextura extends TRecurso{
  constructor(){
    super();
    this.textureCoordinates = [];
    this.textura;
    this.nombre;
  }

  cargarFichero(nombre){
    GTexturaImg = '/assets/motor/'+nombre;
    this.nombre = '/assets/motor/'+ nombre;
  }

  draw(){
    let gl = GShader.gl;
    console.log(GShader);
    this.textura = gl.createTexture();
    this.image = new Image();
    this.image.onload = function(){
      gl.bindTexture(gl.TEXTURE_2D, this.textura);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    this.image.src= this.nombre;
    GTextura = this.textura;
  }
}
