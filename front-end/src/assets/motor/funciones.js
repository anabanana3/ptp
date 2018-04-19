function iniciarMotor(){
  GFachada = new TFachadaMotor();

  let camara1 = GFachada.crearCamaraCompleto("camara1");
  let luz1 = GFachada.crearLuzCompleto("luz1");

  let vagina = GFachada.crearMallaCompleto("Vagina", "tetera.obj", "material.mtl", "textura.jpg");
  GShader = GFachada.crearShader('fragShader.frag', 'vertShader.vert');
  setTimeout(() => {
    GFachada.draw();
    GShader.mainShader(vagina, luz1);
  },500);

  let canvas = document.getElementById('canvas');
  recargar(true, vagina);

}
function recargar(cambio, vagina){
  while(cambio){
    setTimeout(() => {
      // GFachada.draw();
      GShader.bucle(vagina.malla);
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
