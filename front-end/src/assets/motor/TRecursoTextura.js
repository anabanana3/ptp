class TRecursoTextura extends TRecurso{
  constructor(){
    super();
    this.textureCoordinates = [];
    this.textura;
  }

  initWebGL(canvas) {
    var gl = null;
    try {
      // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    // Si no tenemos ningun contexto GL, date por vencido ahora
    if (!gl) {
      alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
      gl = null;
    }
    return gl;
  }

  cargarFichero(nombre){
      var self = this;
      var canvas = document.getElementById('canvas');
      var gl = this.initWebGL(canvas);
      var textura;
      textura = gl.createTexture();
      //creamos una imagen para asociarla a la textura
      textura.image = new Image();
      /*textura.image.onload = function() {
        self.handleLoadedTexture(textura);
      }*/
      textura.image.src = '/assets/motor/' + nombre;
      this.textura = textura;
      GTextura = this.textura;
  }

  draw(){
    GTextura = this.textura;
  }
}
