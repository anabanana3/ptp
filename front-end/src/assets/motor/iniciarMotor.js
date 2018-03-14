function iniciarMotor(){
  let fachada = new TFachadaMotor();

  let camara1 = fachada.crearCamaraCompleto("camara1");
  let luz1 = fachada.crearLuzCompleto("luz1");

  let vagina = fachada.crearMallaCompleto("Vagina", "cube-mini.json", "box.mtl");

  setTimeout(() => { fachada.draw()}, 1000);
}
