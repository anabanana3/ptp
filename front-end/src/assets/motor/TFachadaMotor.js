class TFachadaMotor {

  constructor(){
    this.escena = new TNodo("Escena");
    this.gestor = new TGestorRecursos();
  //Registro para objetos
    this.regLuces = new Array();
    this.regCamaras = new Array();
    this.animaciones = [];
    this.objetos = [];
  }
//En nuestro motor creamos los nodos con un nombre asignado que le damos
//nosotras, por lo que para crear, borrar etc necesitamos pasarle el nombre
//del nodo.
  crearNodo(nombre, padre, entidad){
    let nodo = new TNodo(nombre, padre);
    if (entidad != null){
      nodo.setEntidad(entidad);
    }
    return nodo;
  }
  borrarNodo(nodo){
    for (var i = 0; i < this.objetos.length; i++) {
      if(this.objetos[i].nombre != "Piernas"){
        this.objetos.splice(i,1);
      }
    }
    let padre = nodo.getPadre();
    padre.removeHijo(nodo);
  }
//este metodo lo usamos para crear los nodos transformacion en el arbol
  crearTransform(){
    let trans = new TTransformacion();
    return trans;
  }

  escalar(nodo, x, y, z){
    let nodoEscala = nodo.getPadre().getPadre().getPadre();
    nodoEscala.entidad.escalar(x, y, z);
  }

  rotar(nodo, rad, axis1, axis2, axis3){
    let nodoRota = nodo.getPadre().getPadre();
    nodoRota.entidad.rotar(rad, axis1, axis2, axis3);
  }

  trasladar(nodo, tx, ty, tz){
    let nodoTrasla = nodo.getPadre();
    nodoTrasla.entidad.trasladar(tx, ty, tz);
  }


//Para crear los objetos Animacion, Camara, Luz y Malla
//tenemos dos metodos distintos, uno crea unicamente el nodo donde se
//encuentra dicho objeto y otro llamado CrearXCompleto, en el cual
//creamos el objeto con todos sus nodos padre desde el nodo escena.
//Estos son: (Escalar) + Rotar + TRasladar + Objeto

//Por lo general usamos CrearXCompleto pero los demas nos dan la posibilidad
//de crear un objeto independientemente.

  //---- Animacion ----/
  crearAnimacion(nombre, padre, carpeta){
    let nodo = new TNodo(nombre, padre);
    let animacion = new TAnimacion();
    nodo.setEntidad(animacion);
    animacion.loadAnimacion(carpeta, nodo);

    return nodo;
  }

  crearAnimacionCompleto(nombre, carpeta){
    let escala = this.crearNodo("EscalaAnim", this.escena, this.crearTransform());
    let rota = this.crearNodo("RotaAnim", escala, this.crearTransform());
    let trasla = this.crearNodo("TraslaAnim", rota, this.crearTransform());
    let animacion = this.crearAnimacion(nombre, trasla, carpeta);
    escala.entidad.escalar(0.1,0.1,0.1);

    this.animaciones.push(animacion);
    return animacion;
  }

  //---- Camara ----//
  crearCamara(nombre, padre){
    let nodo = new TNodo(nombre, padre);
  	let camara = new TCamara();
  	nodo.setEntidad(camara);
    this.regCamaras.push(nodo);
    //fovy, aspect, near, far - angulo en radianes, aspecto, cerca, lejos
    //camara.setPerspectiva(0.3, canvas.width / canvas.height, 0, 10);
    //camara.setParalela(-50, 50, -20, 20, 20, -15);
  	return nodo;
  }
  crearCamaraCompleto(nombre){
    let rota = this.crearNodo("RotaCam", this.escena, this.crearTransform());
    let trasla = this.crearNodo("TraslaCam", rota, this.crearTransform());
    // trasla.entidad.trasladar(0, 0, -20)
    let cam = this.crearCamara(nombre, trasla);
    return cam;
  }

//Metodo para borrar todas las camaras de la escena desde la raiz
  borrarCamaraCompleto(){
    for(let i=0; i<this.regCamaras.length; i++){
      this.escena.removeHijo(this.regCamaras[i].getPadre().getPadre());
      this.regCamaras[i] = 0;
    }
  }

  //---- luz ----//
  crearLuz(nombre, padre){
    let nodo = new TNodo(nombre, padre);
  	let luz = new TLuz();
  	nodo.setEntidad(luz);
    this.regLuces.push(nodo);
  	return nodo;
  }
  crearLuzCompleto(nombre){
    let rota = this.crearNodo("RotaLuz", this.escena, this.crearTransform());
    let trasla = this.crearNodo("TraslaLuz", rota, this.crearTransform());
    let luz = this.crearLuz(nombre, trasla);
    trasla.entidad.trasladar(0,5,2);
    return luz;
  }

  borrarLuzCompleto(){
    for(let i=0; i<this.regLuces.length; i++){
      this.escena.removeHijo(this.regLuces[i].getPadre().getPadre());
      this.regLuces[i] = 0;
    }
  }

  //---- Malla ----//
  crearMalla(nombre, ficheroMalla, ficheroMaterial, ficheroTextura, padre){
    let nodo = new TNodo(nombre, padre);
    let entMalla = new TMalla();
    nodo.setEntidad(entMalla);
    entMalla.malla = this.gestor.getRecurso(ficheroMalla, "malla");
    entMalla.material = this.gestor.getRecurso(ficheroMaterial, "material");
    if(ficheroTextura){
      entMalla.textura = this.gestor.getRecurso(ficheroTextura, "textura");
    }
    return nodo;
  }
  crearMallaCompleto(nombre, ficheroMalla, ficheroMaterial, ficheroTextura){
    let escala = this.crearNodo("EscalaMalla", this.escena, this.crearTransform());
    let rota = this.crearNodo("RotaMalla", escala, this.crearTransform());
    let trasla = this.crearNodo("TraslaMalla", rota, this.crearTransform());
    let malla = this.crearMalla(nombre, ficheroMalla, ficheroMaterial, ficheroTextura, trasla);
    // escala.entidad.escalar(0.1,0.1,0.1);
    // trasla.entidad.trasladar(0,-2,0);
    // rota.entidad.rotar(1.41372, 0, 1, 0);

    //Guardamos las matrices de forma global para obtenerlas en el shader
    malla.entidad.modelMatrix = trasla.entidad.modelMatrix;

    this.objetos.push(malla);
    return malla;
  }

//Creamos el shader pasandole el FragmentShader.frag, VertexShader.vert,
//ToonFragmentShader.frag y ToonVertexShader.vert
  crearShader(frag, vert, toonfrag, toonvert){
    let shader = new TShader();
    shader.cargarFichero(frag);
    shader.cargarFichero(vert);
    shader.cargarFichero(toonfrag, true);
    shader.cargarFichero(toonvert, true);
    return shader;
  }

  getCamaras(){
    return this.regCamaras;
  }
  getLuces(){
    return this.regLuces;
  }

  draw(){
    this.escena.draw();
  }
}
