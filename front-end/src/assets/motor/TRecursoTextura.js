class TRecursoTextura extends TRecurso{
  constructor(){
    super();
    this.textureCoordinates = [];
    this.textura;
    this.nombre;
  }

  cargarFichero(nombre){
    GTexturaImg = '/assets/motor/'+nombre;
    this.nombre = '/assets/motor/'+ nombre;
  }

  draw(){
  }
}
