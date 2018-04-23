class TShader extends TRecurso {
  constructor(){
    super();
    this.VertexShader;
    this.FragmentShader;
    this.shaderProgram;
    this.programa = null;
    this.vertexBuffer = null; //buffer de vertices
    this.indexBuffer = null; //buffer de indices
    this.normalBuffer = null; //buffer de normales
    this.canvas = document.getElementById('canvas');
    this.gl = null;
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

  configure(){
    this.gl.clearColor(0.5, 0.5,0.5,1.0); //color del fondo
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

    //crear camara
  }

  initProgram(){
    var gl = this.gl;
    //creamos el programa y le pasamos los shader
    //Vertex Shader
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, this.VertexShader);
    // console.log(this.VertexShader);
    gl.compileShader(vertShader);
    var error = gl.getShaderInfoLog(vertShader);

    if (error.length > 0) {
      console.log(error);
      throw(error);
    }
    //FragmentShader
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, this.FragmentShader);
    gl.compileShader(fragShader);

    var error = gl.getShaderInfoLog(fragShader);

    if (error.length > 0) {
      console.log(error);
      throw(error);
    }

    //creamos el programa
    this.programa  = gl.createProgram();
    gl.attachShader(this.programa, vertShader);
    gl.attachShader(this.programa, fragShader);
    gl.linkProgram(this.programa);

    if(!gl.getProgramParameter(this.programa, gl.LINK_STATUS)){
      alert("No se pueden inicializar los shaders");
    }
    gl.useProgram(this.programa);

    //vertices
    this.programa.aVertexPosition = gl.getAttribLocation(this.programa, "aVertexPosition");
    this.programa.aVertexNormal = gl.getAttribLocation(this.programa, "aVertexNormal");
    //matrices
    this.programa.ProjectionMatrix = gl.getUniformLocation(this.programa, "ProjectionMatrix");
    this.programa.ModelViewMatrix = gl.getUniformLocation(this.programa, "ModelViewMatrix");
    this.programa.NormalMatrix = gl.getUniformLocation(this.programa, "NormalMatrix");
    //luces
    this.programa.uLightDirection = gl.getUniformLocation(this.programa, "uLightDirection");
    this.programa.uLightPosition = gl.getUniformLocation(this.programa, "uLightPosition");
    this.programa.uLightDiffuse = gl.getUniformLocation(this.programa, "uLightDiffuse");
    this.programa.uLightAmbient= gl.getUniformLocation(this.programa, "uLightAmbient");
    this.programa.uLightSpecular= gl.getUniformLocation(this.programa, "uLightSpecular");
    //material
    this.programa.uMaterialDiffuse = gl.getUniformLocation(this.programa, "uMaterialDiffuse");
    this.programa.uMaterialSpecular = gl.getUniformLocation(this.programa, "uMaterialSpecular");
    this.programa.uMaterialAmbient = gl.getUniformLocation(this.programa, "uMaterialAmbient");
    this.programa.uShininess = gl.getUniformLocation(this.programa, "uShininess");
  }

  initLights(){
    var gl = this.gl;
    let luces = GFachada.regLuces;

    for (var i = 0; i < luces.length; i++) {
      gl.uniform3fv(this.programa.uLightDirection, luces[i].entidad.direccion);
      gl.uniform3fv(this.programa.uLightPosition, luces[i].entidad.position);
      gl.uniform4fv(this.programa.uLightAmbient, luces[i].entidad.ambiente);
      gl.uniform4fv(this.programa.uLightDiffuse, luces[i].entidad.difusa);
    }
  }
  initBuffers(modelo){
    var gl = this.gl;
    //vertices
    let vertexBuffer  = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelo.malla.vertices), gl.STATIC_DRAW); //TO DO
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //indices
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelo.malla.indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    //normales
    let normalBuffer  = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelo.malla.normales), gl.STATIC_DRAW); //TO DO
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    let buffer = {
      vb: vertexBuffer,
      ib: indexBuffer,
      nb: normalBuffer
    };
    return buffer;
  }

  draw(){
    var gl = this.gl;

    gl.viewport(0,0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0,0, this.canvas.width, this.canvas.height);

    try{
      //actualizamos  luz si eso...
      for (var i = 0; i < GFachada.objetos.length; i++) {
        let modelo = GFachada.objetos[i].entidad;
        let buffers = this.initBuffers(modelo);

        gl.uniform4fv(this.programa.uMaterialDiffuse, modelo.material.colorDifuso);
        gl.uniform4fv(this.programa.uMaterialSpecular, modelo.material.colorEspecular);
        gl.uniform4fv(this.programa.uMaterialAmbient, modelo.material.colorAmbiente);
        gl.uniform1f(this.programa.uShininess, modelo.material.uShininess);

        //projection matrix
        // mat4.perspective(45, this.canvas.width/this.canvas.height, 0.1, 10000.0, GProjectionMatrix);
        gl.uniformMatrix4fv(this.programa.ProjectionMatrix, false, GProjectionMatrix);

        //model view matrix
        GModelViewMatrix = mat4.create();
        mat4.multiply(GModelViewMatrix, modelo.modelMatrix, GViewMatrix);
        var angle = this.angle * Math.PI/180;
        // mat4.rotate(GModelViewMatrix, angle, [0, 1, 0]);
        gl.uniformMatrix4fv(this.programa.ModelViewMatrix, false, GModelViewMatrix);

        // normal matrix
        GNormalMatrix = mat4.create();
        mat4.invert(GNormalMatrix, GModelViewMatrix);
        mat4.transpose(GNormalMatrix, GNormalMatrix);
        gl.uniformMatrix4fv(this.programa.NormalMatrix, false, GNormalMatrix);

        gl.enableVertexAttribArray(this.programa.aVertexPosition);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vb);
        gl.vertexAttribPointer(this.programa.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(this.programa.aVertexNormal);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.nb);
        gl.vertexAttribPointer(this.programa.aVertexNormal, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.ib);
        gl.drawElements(gl.TRIANGLES, modelo.malla.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      }

    } catch(err){
      alert(err);
      console.error(err.description);
    }
  }

  bucle(modelo){
    this.draw(modelo);
    // this.animate();
  }

  animate(){
      var timeNow = new Date().getTime();
      if(this.lastTime != 0){
        var elapsed = timeNow - this.lastTime;
        this.angle += (90*elapsed) / 10000.0;
      }
      this.lastTime = timeNow;
  }

  mainShader(){
    this.gl = this.initWebGL(this.canvas);
    this.configure();
    this.initProgram();
    this.initLights();
    this.draw();
    // this.animate();
  }
  //BufferData( , , gl.STREAM_DRAW) para que los datos se cambien cada vez que se renderiza
}
