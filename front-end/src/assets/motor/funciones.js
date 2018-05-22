function iniciarMotor(){
  /*
  Este método se llama desde la interfaz de angular cuando se hace el onload en la clase de aula virtual
  iniciamos gl, creamos la fachada, cargamos el frag y el vert, creamos una camara y una luz
  además creamos las piernas del modelo y el modelo de la vagina por defecto

  GShader -> variable global que contiene la clase shader
  GFachada -> variable global que contiene la clase fachada

  rotar -> método rotar de la fachada al cual le pasamos el nodo que queremos rotar y los datos de rotacion
  escalar -> método escalar de la fachada al cual le pasamos el nodo que queremos escalar y los datos de escalado
  */
  gl = initWebGL(document.getElementById('canvas'));

  GFachada = new TFachadaMotor();
  GShader = GFachada.crearShader('fragShader.frag', 'vertShader.vert', 'toonFragShader.frag', 'toonVertShader.vert');

  let camara1 = GFachada.crearCamaraCompleto("camara1");
  GFachada.rotar(camara1, 1, 1, 0, 0);
  let luz1 = GFachada.crearLuzCompleto("luz1");

  let piernas = GFachada.crearMallaCompleto("Piernas", "Piernas-old.obj", "VaginaCarne.mtl", "piel.jpg");
  let real = GFachada.crearMallaCompleto("Normal", "Normal.obj", "VaginaCarne.mtl", "piel.jpg");
  GFachada.escalar(piernas, 0.1,0.1,0.1);
  GFachada.escalar(real, 0.1,0.1,0.1);

  /*
  Añadimos un setTimeout debido a la sincronicidad de angular, sin el llamariamos a la carga del shader
  y al draw del arbol, antes de haber terminado de leer los modelos
  */
  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },4000);

  //creamos los textos de la informacion adicional sobre los tipos de mutilación
  GtituloElement = document.getElementById("titulo");
  GdescripcionElement = document.getElementById("descripcion");
  // Creamos los nodos para los textos.
  GtituloNode = document.createTextNode("");
  GdescripcionNode = document.createTextNode("");
  texto("Vagina sin mutilación", "Aquella que no ha sufrido ningun tipo de procedimiento dañino.");
}

function mostrarTipo1(){
  /*
  funcion que llamamos al dar al boton TIPO1 de la interfaz
  en esta funcion cambiamos el texto a mostrar, borramos los nodos de los modelos que estemos mostrando
  a excepcion de las Piernas y creamos un nuevo nodo con el nuevo modelo (en este caso el tipo 1)
  */
  texto("Tipo 1 o Clitoridectomia", "Consiste en la extirpación del prepucio del clítoris con o sin excisión parcial o total del glande del clítoris.");

  for (var i = 0; i < GFachada.objetos.length; i++) {
    if (GFachada.objetos[i].nombre != "Piernas") {
      GFachada.borrarNodo(GFachada.objetos[i]);
    }
  }
  let pieza1 = GFachada.crearMallaCompleto("tipo1", "Tipo1.obj", "VaginaCarne.mtl");
  GFachada.escalar(pieza1, 0.1,0.1,0.1);

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },1000);
}

function mostrarTipo2(){
  //función igual que la anterior pero para mostrar el TIPO2
  texto("Tipo 2 o Excisión","La ablación parcial o total del clítoris y los labios menores, con o sin excisión de labios mayores.");
  for (var i = 0; i < GFachada.objetos.length; i++) {
    if (GFachada.objetos[i].nombre != "Piernas") {
      GFachada.borrarNodo(GFachada.objetos[i]);
    }
  }
  let pieza2 = GFachada.crearMallaCompleto("tipo2", "Tipo2.obj", "VaginaCarne.mtl");
  GFachada.escalar(pieza2, 0.1,0.1,0.1);

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },1000);
}

function mostrarTipo3(){
  //función igual que las anteriores pero para mostrar el TIPO3
  texto("Tipo 3 o Infibulación", "Consiste en la extirpación del clítoris, labios menores y labios mayores, produciendo así un estrechamiento del orificio vaginal.");
  for (var i = 0; i < GFachada.objetos.length; i++) {
    if (GFachada.objetos[i].nombre != "Piernas") {
      GFachada.borrarNodo(GFachada.objetos[i]);
    }
  }
  let pieza3 = GFachada.crearMallaCompleto("tipo3", "Tipo3.obj", "VaginaCarne.mtl");
  GFachada.escalar(pieza3, 0.1,0.1,0.1);

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },1000);
}

function mostrarReal(){
  //función igual que las anteriores pero para mostrar el modelo inicial SIN MGF
  texto("Vagina sin mutilación", "Aquella que no ha sufrido ningun tipo de procedimiento dañino.")
  for (var i = 0; i < GFachada.objetos.length; i++) {
    if (GFachada.objetos[i].nombre != "Piernas") {
      GFachada.borrarNodo(GFachada.objetos[i]);
    }
  }
  let real = GFachada.crearMallaCompleto("Normal", "Normal.obj", "VaginaCarne.mtl", "piel.jpg");
  GFachada.escalar(real, 0.1,0.1,0.1);

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },1000);
}
function mostrarCartoon(){
  //Funcion que llamamos desde la interfaz de angular que cambia el shader NOCARTOON al shader CARTOON
  GCartoon = true;

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },2000);
}




function mostrarNoCartoon(){
  //Funcion que llamamos desde la interfaz de angular que cambia el shader CARTOON al shader NOCARTOON
  GCartoon = false;

  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },2000);
}

function mostrarAnimacion(){
  /*
  funcion que se llama desde la interfaz de angular para inicializar la animacion
  en ella creamos el nodo animacion en el arbol y la ejecutamos hasta el ultimo frama

  GAnimacion -> variable global, aqui la ponemos a true hasta que se ejecuta el último frame
  */
  GAnimacion = true;

  let animacion = GFachada.crearAnimacionCompleto("animacion1", "animacion-box");

  GShader.mainShader();
  setTimeout(() => {
    // creamos un while para ejecutar el dibujado de la animacion
    do {
      GFachada.draw();
    } while (GAnimacion);
  },1000);
}

function quitarAnimacion(){
  /*
  funcion que se ejecuta cuando acaba la animacion para volver a mostrar el modelo inicial

  GAnimacion -> ponemos la variable a false para parar la animacion
  */
  GAnimacion = false;

  //borramos el nodo animacion
  GFachada.borrarNodo(GFachada.animaciones[0]);
  setTimeout(() => {
    GShader.mainShader();
    GFachada.draw();
  },2000);
}

function texto(titulo, desc){
  //función que cambia el texto segun el tipo de mutilación que se está mostrando
  //nos hemos basado en https://webglfundamentals.org/webgl/lessons/webgl-text-html.html
  GtituloNode.nodeValue = titulo;
  GdescripcionNode.nodeValue = desc;

  GtituloElement.appendChild(GtituloNode);
  GdescripcionElement.appendChild(GdescripcionNode);
}

function initWebGL(canvas) {
  /*
  funcion basada en la fuente: https://developer.mozilla.org/es/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL
  funcion que se llama en iniciarMotor para inicializar WebGL
  */
  var gl = null;

  try {
    // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    //canvas para mostrar las partes del modelo
    // var textCanvas = document.getElementById("text");
  }
  catch(e) {}

  // Si no tenemos ningun contexto GL, date por vencido ahora
  if (!gl) {
    alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
    gl = null;
  }

  return gl;
}
