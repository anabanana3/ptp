class TLuz extends TEntidad{

  constructor(){
    super();
    //this.intensidad = new TColor();
    this.direccion = [10.0, 10.0, 10.0];
    this.position = [10.0, 10.0, 10.0];
    this.emitida = [0.1,0.1,0.8,0.8];
  	this.ambiente = [0.8,0.8,0.8,1.0];
  	this.especular = [0.2,0.2,0.2,1.0];
  	this.difusa = [0.8,0.8,0.8,1.0];
  }


  setEmitida(emitida){
    this.emitida = emitida;
  }
  getEmitida(){
    return this.emitida;
  }
  setAmbiente(ambiente){
    this.ambiente = ambiente;
  }
  getAmbiente(){
    return this.ambiente;
  }
  setEspecular(especular){
    this.especular = especular;
  }
  getEspecular(){
    return this.especular;
  }
  setDifusa(difusa){
    this.difusa = difusa;
  }
  getDifusa(){
    return this.difusa;
  }

  beginDraw(){
    GLDifuso = this.difusa;
    GLAmbiental = this.ambiente;
    GLEspecular = this.especular;
  }
  endDraw(){}
}
