class TRecursoTextura extends TRecurso{
  constructor(){
    super();
    this.textureCoordinates = [];
    this.textura;
  }

  cargarFichero(nombre){
    GTexturaImg = nombre;
  }

  draw(){}
}
