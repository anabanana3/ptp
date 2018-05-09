function iniciarMotor(){
  //PRUEBA GIT
  GFachada = new TFachadaMotor();
  GShader = GFachada.crearShader('fragShader.frag', 'vertShader.vert');

  let camara1 = GFachada.crearCamaraCompleto("camara1");
  GFachada.rotar(camara1, 1, 1, 0, 0);
  //GFachada.trasladar(camara1, 0,0,-20);
  let luz1 = GFachada.crearLuzCompleto("luz1");

  let piernas = GFachada.crearMallaCompleto("Piernas", "VaginaSinTipo.obj", "VaginaTipo1.mtl");
  let real = GFachada.crearMallaCompleto("Tipo2", "Tipo1En00.obj", "VaginaTipo1.mtl", "WEBGL.png");
  // let vagina = GFachada.crearMallaCompleto("Vagina", "VaginaCentroEje.obj", "VaginaRealistaTipo2.mtl", "WEBGL.png");
  // GFachada.trasladar(vagina2, 0, -0.8, 0);

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);
}

function mostrarTipo1(){
  console.log('mostrarTipo1');
  let pieza1 = GFachada.crearMallaCompleto("Piernas", "Tipo1En00.obj", "VaginaTipo1.mtl");
  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);
}

function mostrarTipo2(){
  console.log('mostrarTipo2');
  let pieza2 = GFachada.crearMallaCompleto("Piernas", "Tipo2Solo.obj", "VaginaTipo1.mtl");
  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);
}

function mostrarTipo3(){
  console.log('mostrarTipo3');
}

function mostrarReal(){
  console.log('mostrarReal');

  let camara = GFachada.getCamaras()[0];
  console.log(camara);
  GFachada.rotar(camara, 3.141588943012, 0, 1, 0);
}

function mostrarCartoon(){
  console.log('mostrarCartoon');
}

function moverCamara(camara, ev){
  if(camara == 0){
    // GFachada.regCamaras[0].interactor.onMouseMove(ev);
  }
}
