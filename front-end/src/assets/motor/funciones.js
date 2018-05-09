function iniciarMotor(){
  //PRUEBA GIT
  GFachada = new TFachadaMotor();
  GShader = GFachada.crearShader('fragShader.frag', 'vertShader.vert');

  let camara1 = GFachada.crearCamaraCompleto("camara1");
  //GFachada.trasladar(camara1, 0,0,-20);
  let luz1 = GFachada.crearLuzCompleto("luz1");

  //let piernas = GFachada.crearMallaCompleto("Piernas", "VaginaSinTipo.obj", "material.mtl");
  //let tipo2 = GFachada.crearMallaCompleto("Tipo2", "Tipo2Solo.obj", "material.mtl", "WEBGL.png");
  let vagina = GFachada.crearMallaCompleto("Vagina", "VaginaCentroEje.obj", "VaginaRealistaTipo2.mtl", "textura.jpg");
  // GFachada.trasladar(vagina2, 0, -0.8, 0);

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);

  let canvas = document.getElementById('canvas');
}

function mostrarTipo1(){
  console.log('mostrarTipo1');
}

function mostrarTipo2(){
  console.log('mostrarTipo2');
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
