class TTransformacion extends TEntidad{

  constructor() {
    super();
    this.transfMatrix = mat4.create();
  }

//Creamos los distintos metodos llamando a la libreria glMatrix
  getMatrix(){
    return this.transfMatrix;
  }
  cargar(matrix){
    this.transfMatrix = matrix;
  }
  identidad(){
    mat4.identity(this.transfMatrix);
  }
  // matriz de salida, matriz a realizar la transformacion ( es la misma )
  transponer(){
    mat4.transpose(this.transfMatrix, this.transfMatrix);
  }
  invertir(){
    mat4.invert(this.transfMatrix, this.transfMatrix);
  }
  trasladar(tx, ty, tz){
    let v = vec3.fromValues(tx, ty, tz);
    mat4.translate(this.transfMatrix, this.transfMatrix, v);
  }
  escalar(ex, ey, ez){
    let v = vec3.fromValues(ex, ey, ez);
    mat4.scale(this.transfMatrix, this.transfMatrix, v);
  }
//Parametros: angulo en radianes y 3 coordenadas del eje
//90 grados = 1,5708 radianes
  rotar(rad, axis1, axis2, axis3){
    let axis = vec3.fromValues(axis1, axis2, axis3);
    mat4.rotate(this.transfMatrix, this.transfMatrix, rad, axis);
  }
//Apilamos la Model MAtrix
  beginDraw(){
    stack.push(this.modelMatrix);
    let aux = mat4.create();

    if(stack[0]){
      aux = stack[0];
    }
    //mat4.multiply(out, a, b);
    mat4.multiply(this.modelMatrix, this.transfMatrix, aux);
  }
  endDraw(){
  //Guardamos y desapilamos
    this.transfMatrix = mat4.create();
    this.modelMatrix = stack[stack.length-1];
    stack.pop();
  }
}
