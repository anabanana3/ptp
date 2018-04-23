function iniciarMotor(){
  GFachada = new TFachadaMotor();

  let camara1 = GFachada.crearCamaraCompleto("camara1");
  let luz1 = GFachada.crearLuzCompleto("luz1");

  let vagina = GFachada.crearMallaCompleto("Vagina", "VAGI0.obj", "material.mtl", "textura.jpg");
  let tetera = GFachada.crearMallaCompleto("Tetera", "tetera.obj", "material2.mtl", "textura.jpg");
  GFachada.trasladar(tetera, 10, -10, 0);

  GShader = GFachada.crearShader('fragShader.frag', 'vertShader.vert');
  setTimeout(() => {
    GFachada.draw();
    GShader.mainShader();
  },500);

  let canvas = document.getElementById('canvas');
  recargar(true);

}
function recargar(cambio){
  while(cambio){
    setTimeout(() => {
      // GFachada.draw();
      GShader.bucle();
    }, 1000);
    cambio = false;
  }
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
