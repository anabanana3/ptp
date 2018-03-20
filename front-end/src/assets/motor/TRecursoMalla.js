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

  draw(){
    // Cargo los shaders
    var shaders = new TShader();
    shaders.cargarFichero('fragShader.frag');
    shaders.cargarFichero('vertShader.vert');

    setTimeout(() => {
      let self = this;
      shaders.loadShaders(self.vertices, self.indices, self.normales);
    }, 1000);

  }
}
