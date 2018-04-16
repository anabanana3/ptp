class TLuz extends TEntidad{

  constructor(){
    super();
    //this.intensidad = new TColor();

    this.emitida = [0.8,0.8,0.8,0.8];
  	this.ambiente = [0.8,0.8,0.8];
  	this.especular = [0.2,0.2,0.2];
  	this.difusa = [0.8,0.8,0.8];
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
