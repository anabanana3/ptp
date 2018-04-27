function iniciarMotor(){
  GFachada = new TFachadaMotor();

  let camara1 = GFachada.crearCamaraCompleto("camara1");
  let luz1 = GFachada.crearLuzCompleto("luz1");

  let vagina = GFachada.crearMallaCompleto("Vagina", "VaginaTipo1.obj", "VaginaTipo1.mtl", "textura.jpg");
  let vagina2 = GFachada.crearMallaCompleto("Vagina", "VaginaRealistaTipo2.obj", "VaginaRealistaTipo2.mtl", "textura.jpg");
  // let tetera = GFachada.crearMallaCompleto("Tetera", "tetera.obj", "material2.mtl", "textura.jpg");
  // GFachada.trasladar(tetera, 0, -15, 0);
  GFachada.trasladar(vagina2, 0, -30, 0);

  GShader = GFachada.crearShader('fragShader.frag', 'vertShader.vert');

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },2000);

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
