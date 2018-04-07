function iniciarMotor(){
  GFachada = new TFachadaMotor();

  let camara1 = GFachada.crearCamaraCompleto("camara1");
  let luz1 = GFachada.crearLuzCompleto("luz1");

  // let camara = fachada.getCamaras()[0];
  // let rotacion = fachada.rotar(camara, 1.4, 1, 0, 0);

  let vagina = GFachada.crearMallaCompleto("Vagina", "tetera.obj", "material.mtl", "textura.jpg");
  let shader = GFachada.crearShader('fragShader.frag', 'vertShader.vert');

  setTimeout(() => {
    GFachada.draw();
    shader.loadShaders();
  }, 10);

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
  let rotacion = GFachada.rotar(camara, 1.4, 1, 0, 0);
}

function mostrarCartoon(){
  console.log('mostrarCartoon');
}
