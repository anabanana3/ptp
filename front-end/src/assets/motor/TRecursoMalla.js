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
    })
  }

  draw(){
    GVertices = this.vertices;
    GIndices = this.indices;
    GNormales = this.normales;
  }
}
