function iniciarMotor(){
  let fachada = new TFachadaMotor();

  let camara1 = fachada.crearCamaraCompleto("camara1");
  let luz1 = fachada.crearLuzCompleto("luz1");

  let vagina = fachada.crearMallaCompleto("Vagina", "box.obj", "box.mtl");

  setTimeout(() => { fachada.draw()}, 1000);
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
}

function mostrarCartoon(){
  console.log('mostrarCartoon');
}
