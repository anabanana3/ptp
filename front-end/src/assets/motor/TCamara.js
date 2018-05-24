class TCamara extends TEntidad {

	constructor(){
		super();
		this.esPrespectiva = false;//Boolean
		this.cercano = null;//Float
		this.lejano = null;//Float
		this.movY = 0.0;
		this.movX = 0.0;
		this.step = 0;
		this.position = vec3.create();

		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();
	}
	//las funciones para hacer girar el modelo setMovimentoY, setMovimentoX, changeMovimentoY, changeMovimentoX y update()
	//las hemos sacado del capitulo 4 (camaras) del libro de webgl
	//nos hemos basado en los ejemplos - ejercicios del libro
	setMovimentoY(y){
		this.changeMovimentoY(y - this.movY);
	}

//usamos esta funcion para calcular lo que se va a rotar el modelo en el eje y
	changeMovimentoY(y){
    this.movY +=y;

    if (this.movY > 360 || this.movY <-360) {
			this.movY = this.movY % 360;
		}
	}

	setPosition(p){
    vec3.set(p, this.position);
    this.update();
	}

	setMovimientoX(x){
		this.changeMovimientoX(x - this.movX);
	}

	//usamos esta funcion para calcular lo que se va a rotar el modelo en el eje x
	changeMovimientoX(x){
		this.movX +=x;

    if (this.movX > 360 || this.movX <-360) {
			this.movX = this.movX % 360;
		}
	}
	
	//aqui es donde vamos cambiando los valores para que cambie la posicion y se mueva
	update(){

		let rotaCamara = GFachada.regCamaras[0].getPadre().getPadre().entidad;
		rotaCamara.rotar(this.movY * Math.PI/180, 0, 1, 0);
		rotaCamara.rotar(this.movX * Math.PI/180, 1, 0, 0);

		GFachada.draw();
	}
	//utilizamos la funcion perspective() de glmatrix
	//fovy => Angulo de vision en radianes
	//aspect => Relacion de aspecto
	setPerspectiva (fovy, aspect, near, far){
		this.esPrespectiva = true;
		mat4.perspective(this.projectionMatrix, fovy, aspect, near, far)
		this.cercano = near;
		this.lejano = far;
	}

	//utilizamos la funcion ortho() de glmatrix
	setParalela (near, far, left, right, top, bottom){
		this.esPrespectiva = false;
		let out = mat4.create();
		mat4.ortho(out, left, right, bottom, top, near, far);
		this.projectionMatrix = out;
		this.cercano = near;
		this.lejano = far;
	}

	//Para obtener la matriz de proyeccion
	getProjectionMatrix(){
		return this.projectionMatrix;
	}
	//para obtener si es perspectiva o paralela
	getTipo(){
		return this.esPrespectiva;
	}

	beginDraw(){
		let rotaCam = GFachada.regCamaras[0].getPadre().getPadre().entidad.modelMatrix;
    let traslaCam = GFachada.regCamaras[0].getPadre().entidad.modelMatrix;
    mat4.multiply(this.viewMatrix, rotaCam, traslaCam);
	}
	endDraw(){}

}
