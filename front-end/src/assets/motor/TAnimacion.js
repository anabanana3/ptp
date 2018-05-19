class TAnimacion extends TEntidad {

  constructor(){
    super();
    this.mallas = [];
  }

  loadAnimacion(carpeta, padre){
    let mallasAnimacion = [];

    for(let i = 0; i<4; i++){
      let malla = GFachada.crearMallaCompleto("Box" + i, carpeta + "/" + i + ".obj", "VaginaCarne.mtl", "textura.jpg");
      let rota = malla.getPadre().getPadre().getPadre();
      rota.entidad.escalar(0.01, 0.01, 0.01);

      this.mallas.push(malla);
    }
  }

  beginDraw(){
    console.log("hola");
  }
}
