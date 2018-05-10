function iniciarMotor(){
  //PRUEBA GIT
  gl = initWebGL(document.getElementById('canvas'));
  GFachada = new TFachadaMotor();
  GShader = GFachada.crearShader('fragShader.frag', 'vertShader.vert');

  let camara1 = GFachada.crearCamaraCompleto("camara1");
  GFachada.rotar(camara1, 1, 1, 0, 0);
  //GFachada.rotar(camara1, 3, 0, 0, 1);
  //GFachada.trasladar(camara1, 0,0,-20);
  let luz1 = GFachada.crearLuzCompleto("luz1");

  let piernas = GFachada.crearMallaCompleto("Piernas", "Piernas.obj", "VaginaRealistaTipo2.mtl", "cesped.jpg");
  let real = GFachada.crearMallaCompleto("Normal", "Normal.obj", "VaginaRealistaTipo2.mtl", "textura.jpg");
  // let vagina = GFachada.crearMallaCompleto("Vagina", "VaginaCentroEje.obj", "VaginaRealistaTipo2.mtl", "WEBGL.png");
  // GFachada.trasladar(vagina2, 0, -0.8, 0);

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },5000);
}

function mostrarTipo1(){
  console.log('mostrarTipo1');
  for (var i = 0; i < GFachada.objetos.length; i++) {
    if (GFachada.objetos[i].nombre != "Piernas") {
      GFachada.borrarNodo(GFachada.objetos[i]);
    }
  }
  let pieza1 = GFachada.crearMallaCompleto("tipo1", "Tipo1.obj", "VaginaTipo1.mtl");
  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);
}

function mostrarTipo2(){
  console.log('mostrarTipo2');
  for (var i = 0; i < GFachada.objetos.length; i++) {
    if (GFachada.objetos[i].nombre != "Piernas") {
      GFachada.borrarNodo(GFachada.objetos[i]);
    }
  }
  let pieza2 = GFachada.crearMallaCompleto("tipo2", "Tipo2.obj", "VaginaTipo1.mtl");
  console.log(GFachada.objetos);
  //GFachada.borrarNodo()
  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);
}

function mostrarTipo3(){
  console.log('mostrarTipo3');
  for (var i = 0; i < GFachada.objetos.length; i++) {
    if (GFachada.objetos[i].nombre != "Piernas") {
      GFachada.borrarNodo(GFachada.objetos[i]);
    }
  }
  let pieza3 = GFachada.crearMallaCompleto("tipo3", "Tipo3.obj", "VaginaTipo1.mtl");
  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);
}

function mostrarReal(){
  console.log('mostrarReal');
  for (var i = 0; i < GFachada.objetos.length; i++) {
    if (GFachada.objetos[i].nombre != "Piernas") {
      GFachada.borrarNodo(GFachada.objetos[i]);
    }
  }
  let real = GFachada.crearMallaCompleto("Normal", "Normal.obj", "VaginaRealistaTipo2.mtl", "textura.jpg");
  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);
}

function mostrarCartoon(){
  console.log('mostrarCartoon');
}

function moverCamara(camara, ev){
  if(camara == 0){
    // GFachada.regCamaras[0].interactor.onMouseMove(ev);
  }
}

function initWebGL(canvas) {
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
