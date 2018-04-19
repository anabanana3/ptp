class TShaderBASURA extends TRecurso {
  constructor(){
    super();
    this.VertexShader;
    this.FragmentShader;
    this.shaderProgram;
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

  request(url) {
    return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = function(e){
        resolve(e.target.response);
      };
      req.onerror = function (e) {
        console.log(e);
      };
      req.send();
    });
  }

  cargarFichero(nombre){
    let request = this.request('/assets/motor/' + nombre).then((e) => {
      let aux = nombre.split('.');
      let ext = aux[aux.length-1];
      if(ext === 'vert'){
        this.VertexShader = e;
      }
      else if(ext === 'frag'){
        this.FragmentShader = e;
      }
    })
  }

  //TODO => Pasarle los datos al Shader

  load(gl){
    // Program.load(attributeList, uniformList);
    //Vertex Shader
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, this.VertexShader);
    // console.log(this.VertexShader);
    gl.compileShader(vertShader);

    var error = gl.getShaderInfoLog(vertShader);

    if (error.length > 0) {
      console.log(error)
    }

    //FragmentShader
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, this.FragmentShader);
    gl.compileShader(fragShader);

    var error = gl.getShaderInfoLog(fragShader);

    if (error.length > 0) {
      console.log(error);
      throw error;
    }

    programa = gl.createProgram();
    gl.attachShader(programa, vertShader);
    gl.attachShader(programa, fragShader);
    gl.linkProgram(programa);
  }

  loadShaders(){
    let vertices = GVertices;
    let indices = GIndices;
    let normales = GNormales;
    let texcords = GCoordTex;

    var canvas = document.getElementById('canvas');
    var gl = this.initWebGL(canvas);

    this.load(gl);
    //Creo los buffers

    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); //unbind -> desatar

    // Create an empty buffer object to store Index buffer
    var Index_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    var Normal_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Normal_Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normales), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    //buffer para las texturas
    var Texture_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Texture_Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcords), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    console.log('Buffers ****');
    console.log('vertices: ' + vertices);
    console.log('indices: ' + indices);
    console.log('normales: ' + normales);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind vertex buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);  // Bind index buffer object

    gl.useProgram(programa);
    // Get the attribute location
    var coord = gl.getAttribLocation(programa, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, Normal_Buffer);
    //NORMAL
    var sNormal = gl.getAttribLocation(programa, "VertexNormal");
    gl.vertexAttribPointer(sNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(sNormal);

    console.log('coordinates: ????');
    console.log('VertexNormal: ????');
    console.log(GTextura);

    //texturas
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    var textura;
    textura = gl.createTexture();
    //creamos una imagen para asociarla a la textura
    var image = new Image();
    image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, textura);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    image.src = '/assets/motor/' + GTextura;

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindBuffer(gl.ARRAY_BUFFER, Texture_Buffer);
    var tex = gl.getAttribLocation(programa, "Textura");
    gl.vertexAttribPointer(tex, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(tex);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.uniform1i(programa.uSampler, 0);


    //Le paso las matrices al shader
    //Obtengo la ModelViewMatrix con la libreria GLMATRIX
    GModelViewMatrix = mat4.create();
    mat4.multiply(GModelViewMatrix, GModelMatrix, GViewMatrix );
    var SModelViewMatrix = gl.getUniformLocation(programa, "ModelViewMatrix");
    gl.uniformMatrix4fv(SModelViewMatrix, false, GModelViewMatrix);

    //NormalMatrix
    GNormalMatrix = mat4.create();
    mat4.invert(GNormalMatrix, GModelViewMatrix);
    mat4.transpose(GNormalMatrix, GNormalMatrix);
    var SNormalMatrix = gl.getUniformLocation(programa, "NormalMatrix");
    gl.uniformMatrix4fv(SNormalMatrix, false, GNormalMatrix);

    //ProjectionMatrix
    var SProjectionMatrix = gl.getUniformLocation(programa, "ProjectionMatrix");
    gl.uniformMatrix4fv(SProjectionMatrix, false, GProjectionMatrix);

    console.log('GModelMatrix: ' + GModelMatrix);
    console.log('GViewMatrix: ' + GViewMatrix);
    console.log('ModelViewMatrix: ' + GModelViewMatrix);
    console.log('GNormalMatrix: ' + GNormalMatrix);
    console.log('GProjectionMatrix: ' + GProjectionMatrix);

    //MVP
    gMVP = mat4.create();
    mat4.multiply(gMVP, GModelViewMatrix, GProjectionMatrix);
    var sMVP = gl.getUniformLocation(programa, "MVP");
    gl.uniformMatrix4fv(sMVP, false, gMVP);

    console.log('gMVP: ' + gMVP);

    console.log('Materiales **** ');
    console.log('GDifuso: ' + GDifuso);
    console.log('GAmbiental: ' + GAmbiental);
    console.log('GEspecular: ' + GEspecular);
    console.log('GBrillo: ' + GBrillo);

    //Paso las componentes del material
    var SDifusa = gl.getUniformLocation(programa, "Kd");
    gl.uniform1i(SDifusa, GDifuso);
    console.log(SDifusa);

    var SAmbiental = gl.getUniformLocation(programa, "Ka");
    gl.uniform1i(SAmbiental, GAmbiental);

    var SEspecular = gl.getUniformLocation(programa, "Ks");
    gl.uniform1i(SEspecular, GEspecular);

    var SBrillo = gl.getUniformLocation(programa, "Shininess");
    gl.uniform1f(SBrillo, GBrillo);

    //Pasamos las componentes de la luz
    var LAmbiental = gl.getUniformLocation(programa, "La");
    gl.uniform3fv(LAmbiental, GLAmbiental);

    var LDifusa = gl.getUniformLocation(programa, "Ld");
    gl.uniform3fv(LDifusa, GLDifuso);

    var LEspecular = gl.getUniformLocation(programa, "Ls");
    gl.uniform3fv(LEspecular, GLEspecular);

    //LIGTHPOSITION
    let luz = vec4.create();
    mat4.multiply(luz, GPositionLuz, [1,1,1,1]);
    var SPosicionLuz = gl.getUniformLocation(programa, "LightPosition");
    gl.uniform4fv(SPosicionLuz, luz);
    console.log('GPositionLuz: ' + GPositionLuz);
    console.log('luz: ' + luz);

    //LIGTHINTENSITY
    var SIntensidad = gl.getUniformLocation(programa, "LightIntensity");
    gl.uniform3fv(SIntensidad, GIntensidadLuz);
    console.log('GIntensidadLuz: ' + GIntensidadLuz);

    //Drawing
    gl.viewport(0,0,canvas.width,canvas.height);

    //gl.drawElements(Mode, Count, Type, Offset)
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    // gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT,0);

  }

  getShaderProgram(){
    return this.shaderProgram;
  }
}
