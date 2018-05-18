function iniciarMotor(){
  //PRUEBA GIT
  gl = initWebGL(document.getElementById('canvas'));

  GFachada = new TFachadaMotor();
  GShader = GFachada.crearShader('fragShader.frag', 'vertShader.vert', 'toonFragShader.frag', 'toonVertShader.vert');

  let camara1 = GFachada.crearCamaraCompleto("camara1");
  GFachada.rotar(camara1, 1, 1, 0, 0);
  let luz1 = GFachada.crearLuzCompleto("luz1");

  // let piernas = GFachada.crearMallaCompleto("Piernas", "Piernas-old.obj", "PIERNAS.mtl", "piel.jpg");
  // let real = GFachada.crearMallaCompleto("Normal", "Normal.obj", "VaginaRealistaTipo2.mtl", "textura.jpg");
  // piernas.getPadre().getPadre().getPadre().entidad.escalar(0.1,0.1,0.1);
  // real.getPadre().getPadre().getPadre().entidad.escalar(0.1,0.1,0.1);

  // GFachada.trasladar(vagina2, 0, -0.8, 0);

  let animacion = GFachada.crearAnimacionCompleto("animacion1", "animacion-box");

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },5000);

  GtituloElement = document.getElementById("titulo");
  GdescripcionElement = document.getElementById("descripcion");

  // Creamos los nodos para los textos.
  GtituloNode = document.createTextNode("");
  GdescripcionNode = document.createTextNode("");
  texto("Vagina sin mutilación", "Aquella que no ha sufrido ningun tipo de procedimiento dañino.");
}

function mostrarTipo1(){
  console.log('mostrarTipo1');
  texto("Tipo 1 o Clitoridectomia", "Consiste en la extirpación del prepucio del clítoris con o sin excisión parcial o total del glande del clítoris.");

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

  texto("Tipo 2 o Excisión","La ablación parcial o total del clítoris y los labios menores, con o sin excisión de labios mayores.");
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
  texto("Tipo 3 o Infibulación", "Consiste en la extirpación del clítoris, labios menores y labios mayores, produciendo así un estrechamiento del orificio vaginal.");
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
  texto("Vagina sin mutilación", "Aquella que no ha sufrido ningun tipo de procedimiento dañino.")
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
  GCartoon = true;
  console.log('mostrarCartoon');

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);
}


function texto(titulo, desc){
  //función que cambia el texto segun el tipo de mutilación que se está mostrando
  //nos hemos basado en https://webglfundamentals.org/webgl/lessons/webgl-text-html.html
   GtituloNode.nodeValue = titulo;
   GdescripcionNode.nodeValue = desc;

  GtituloElement.appendChild(GtituloNode);
  GdescripcionElement.appendChild(GdescripcionNode);
}

function mostrarNoCartoon(){
  GCartoon = false;
  console.log('mostrarNoCartoon');

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },3000);
}

function initWebGL(canvas) {
  var gl = null;

  try {
    // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    //canvas para mostrar las partes del modelo
    // var textCanvas = document.getElementById("text");
    ctx = canvas.getContext("2d");
  }
  catch(e) {}

  // Si no tenemos ningun contexto GL, date por vencido ahora
  if (!gl) {
    alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
    gl = null;
  }

  return gl;
}
