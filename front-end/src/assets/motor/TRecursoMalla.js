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
      this.vertices = e.data.attributes.position.array;
      this.normales = e.data.attributes.normal.array;
      this.indices = e.data.index.array;
      console.log(this);
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
    /*Se supone que debemos llamar a esta funcion con un recurso.draw()
    en este caso ese recurso sera un TRecursoMalla
    y al ser un recurso debe anteriormente haber llamado a cargarFichero y
    haber rellenado todas las variables que se estipulan en el
    constructor para cuando llegue a este metodo, pintarlo con WebGL*/
    let canvas = document.getElementById('canvas');
    console.log(canvas);
    console.log('Estamos en TRecursoMalla y hacemos draw');

    let gl = this.initWebGL(canvas);
    /*======== Defining and storing the geometry ===========*/

     let vertices = this.vertices;

     let indices = this.indices;


     // Create an empty buffer object to store vertex buffer
     let vertex_buffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
     gl.bindBuffer(gl.ARRAY_BUFFER, null); //unbind -> desatar

     // Create an empty buffer object to store Index buffer
     let Index_Buffer = gl.createBuffer();
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

     /*================ Shaders ====================*/
     // Vertex shader source code

     let vertCode =
        'attribute vec3 coordinates;' +

        'void main(void) {' +
           ' gl_Position = vec4(coordinates, 1.0);' +
        '}';

     // Create a vertex shader object
     let vertShader = gl.createShader(gl.VERTEX_SHADER);
     gl.shaderSource(vertShader, vertCode); // adjuntar con vertCode
     gl.compileShader(vertShader);  // Compilar vertShader

     let fragCode =
        'void main(void) {' +
           ' gl_FragColor = vec4(0.3, 0.2, 0.7, 1.0);' +
        '}'; //fragment shader source code

     // Create fragment shader object

     let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
     gl.shaderSource(fragShader, fragCode); // adjuntar con fragCode
     gl.compileShader(fragShader);  // Compilar fragShader
     console.log(fragShader);
     // Objeto de programa para almacenar el programa de sombreado combinado
     let shaderProgram = gl.createProgram();
     gl.attachShader(shaderProgram, vertShader);  // adjuntar con vertShader
     gl.attachShader(shaderProgram, fragShader);  // adjuntar con fragShader

     gl.linkProgram(shaderProgram); // Link both the programs
     gl.useProgram(shaderProgram);  // Use the combined shader program object

     console.log(shaderProgram);

      // var prueba = new TShader();
      // prueba.cargarFichero("vertShader.vert");
      // prueba.cargarFichero("fragShader.frag");
      // prueba.loadShaders();

     /*======= Associating shaders to buffer objects =======*/
     gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind vertex buffer object
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);  // Bind index buffer object

     // Get the attribute location
    let coord = gl.getAttribLocation(shaderProgram, "coordinates");
    //  console.log(prueba.getShaderProgram());
    //  var aux = prueba.getShaderProgram();
    //  var coord = gl.getAttribLocation(aux, "coordinates");
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(coord);

     /*=========Drawing the triangle===========*/
     gl.viewport(0,0,canvas.width,canvas.height);
     //gl.drawElements(Mode, Count, Type, Offset)
     gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
     // gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT,0);

  }
}
