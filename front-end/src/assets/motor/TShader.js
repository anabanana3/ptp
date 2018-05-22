class TShader extends TRecurso {
  //hemos creado el shader basandonos en el libro webgl en varios capitulos, y en los ejemplos
  constructor(){
    super();
    this.VertexShader;
    this.FragmentShader;
    this.ToonFragmentShader;
    this.ToonVertexShader;
    this.shaderProgram;
    this.programa = null;
    this.vertexBuffer = null; //buffer de vertices
    this.indexBuffer = null; //buffer de indices
    this.normalBuffer = null; //buffer de normales
    this.canvas = document.getElementById('canvas');
    this.gl = gl;
  }
  //para cargar el archivo
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
  //leemos los archivos, y separamos entre shader cartoon y shader normal
  cargarFichero(nombre, cartoon = false){
    let request = this.request('/assets/motor/' + nombre).then((e) => {
      let aux = nombre.split('.');
      let ext = aux[aux.length-1];
      if(ext === 'vert'){
        if(cartoon){
          this.ToonVertexShader = e;
          console.log('es cartoon');
        }else{
          this.VertexShader = e;
        }
      }
      else if(ext === 'frag'){
        if(cartoon){
          this.ToonFragmentShader = e;
        }else{
          this.FragmentShader = e;
        }
      }
    })
  }
  //configuramos el canvas
  //creamos las camaras
  configure(){
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    //crear camara
    for (var i = 0; i < GFachada.regCamaras.length; i++) {
      let camara  = GFachada.regCamaras[i].entidad;
      camara.interactor = new TCamaraInteractor(camara, this.canvas);
    }
  }
  //inicializamos el programa
  initProgram(frag, vert){
    var gl = this.gl;
    //creamos el programa y le pasamos los shader
    //Vertex Shader
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vert);
    // console.log(this.VertexShader);
    gl.compileShader(vertShader);
    var error = gl.getShaderInfoLog(vertShader);

    if (error.length > 0) {
      console.log(error);
      throw(error);
    }
    //FragmentShader
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, frag);
    gl.compileShader(fragShader);

    var error = gl.getShaderInfoLog(fragShader);

    if (error.length > 0) {
      console.log(error);
      throw(error);
    }

    //creamos el programa
    let programa1  = gl.createProgram();
    gl.attachShader(programa1, vertShader);
    gl.attachShader(programa1, fragShader);

    this.programa = programa1;
    gl.linkProgram(this.programa);

    if(!gl.getProgramParameter(this.programa, gl.LINK_STATUS)){
      alert("No se pueden inicializar los shaders");
    }
    gl.useProgram(this.programa);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //asignamos las variables a los shades
    //vertices
    this.programa.aVertexPosition = gl.getAttribLocation(this.programa, "aVertexPosition");
    this.programa.aVertexNormal = gl.getAttribLocation(this.programa, "aVertexNormal");
    //matrices
    this.programa.ProjectionMatrix = gl.getUniformLocation(this.programa, "ProjectionMatrix");
    this.programa.ModelViewMatrix = gl.getUniformLocation(this.programa, "ModelViewMatrix");
    this.programa.NormalMatrix = gl.getUniformLocation(this.programa, "NormalMatrix");

    //Estas variables no se usan en el shader cartoon, por eso comprobamos
    //que se trate del modelo realista
    if(GCartoon ==false){
      //luces
      this.programa.uLightPosition = gl.getUniformLocation(this.programa, "uLightPosition");
      this.programa.uLightDiffuse = gl.getUniformLocation(this.programa, "uLightDiffuse");
      this.programa.uLightSpecular= gl.getUniformLocation(this.programa, "uLightSpecular");
      //material
      this.programa.uMaterialDiffuse = gl.getUniformLocation(this.programa, "uMaterialDiffuse");
      this.programa.uMaterialSpecular = gl.getUniformLocation(this.programa, "uMaterialSpecular");
      this.programa.uShininess = gl.getUniformLocation(this.programa, "uShininess");
      //texturas
      this.programa.aVertexTextureCoords = gl.getAttribLocation(this.programa, "aVertexTextureCoords");
      this.programa.uSampler = gl.getUniformLocation(this.programa, "uSampler");
    }
    //luces
    this.programa.uLightDirection = gl.getUniformLocation(this.programa, "uLightDirection");
    this.programa.uLightAmbient= gl.getUniformLocation(this.programa, "uLightAmbient");
    //material
    this.programa.uMaterialAmbient = gl.getUniformLocation(this.programa, "uMaterialAmbient");
  }
  //incializamos las luces
  initLights(){
    var gl = this.gl;
    let luces = GFachada.regLuces;
    //para cada luz, le pasamos sus valores al shader
    for (var i = 0; i < luces.length; i++) {
      // luces[i].entidad.setAmbiente(vec4.fromValues(0.4,0.4,0.4,1.0));
      gl.uniform3fv(this.programa.uLight, luces[i].entidad.position);
      gl.uniform3fv(this.programa.uLightDirection, luces[i].entidad.direccion);
      gl.uniform3fv(this.programa.uLightPosition, luces[i].entidad.position);
      gl.uniform4fv(this.programa.uLightAmbient, luces[i].entidad.ambiente);
      gl.uniform4fv(this.programa.uLightDiffuse, luces[i].entidad.difusa);
    }
  }
  //animacion
  animate(){
      var timeNow = new Date().getTime();
      if(this.lastTime != 0){
        var elapsed = timeNow - this.lastTime;
        this.angle += (90*elapsed) / 10000.0;
      }
      this.lastTime = timeNow;
  }
//desde aqui llamamos a todas las funcines pasandole el shader cartoon o el realista
  mainShader(){
    this.configure();
    if(GCartoon){
      this.initProgram(this.ToonFragmentShader, this.ToonVertexShader);
      console.log('cartoon');
    }
    else{
      this.initProgram(this.FragmentShader, this.VertexShader);
      console.log('no cartoon');
    }
    this.initLights();
    //this.initTexture();
    //inicializamos el viewport
    this.gl.viewport(0,0, this.canvas.width, this.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.viewport(0,0, this.canvas.width, this.canvas.height);
    // this.animate();
  }
}
