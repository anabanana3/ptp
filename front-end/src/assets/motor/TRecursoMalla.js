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
        console.log(JSON.parse(e.target.response));
        resolve(JSON.parse(e.target.response));
      };
      req.onerror = function (e) {
        console.log(e);
      };
      req.send();
    });
  }

  cargarFichero(nombre){
    let json;
    let request = this.request('/assets/motor/' + nombre).then((e) => {
      this.indices = e.model.meshes[0].face.vertElementIndices;
      this.vertices = e.model.meshes[0].verts;
      this.normales = e.model.meshes[0].vertElement.normals;
    })
  }

  initWebGL(canvas) {
    let gl = null;

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

  draw(){
    var canvas = document.getElementById('canvas');

      console.log('Estamos en TRecursoMalla y hacemos draw');

      var gl = this.initWebGL(canvas);
      /*======== Defining and storing the geometry ===========*/

       var vertices = this.vertices;

       var indices = this.indices;

       var normales = this.normales;

      // Cargo los shaders
       var shaders = new TShader();
       shaders.cargarFichero('fragShader.frag');
       shaders.cargarFichero('vertShader.vert');

       shaders.loadShaders(vertices, indices, normales);
  }
}
