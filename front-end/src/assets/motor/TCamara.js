class TCamara extends TEntidad {

	constructor(){
		super();
		this.esPrespectiva = false;//Boolean
		this.cercano = null;//Float
		this.lejano = null;//Float
		this.home = vec3.create();
		this.azimuth = 0.0;
		this.elevation = 0.0;
		this.steps = 0;
		this.position = vec3.create();
		this.matrix = mat4.create();
		this.up = vec3.create();
		this.right = vec3.create();
		this.normal = vec3.create();
	}

	goHome(h){
    if (h != null){
        this.home = h;
    }
    this.setPosition(this.home);
    this.setAzimuth(0);
    this.setElevation(0);
    this.steps = 0;
	}
	dolly(s){
		var c = this;

    var p =  vec3.create();
    var n = vec3.create();

    p = c.position;

    var step = s - c.steps;

    vec3.normalize(c.normal,n);

    var newPosition = vec3.create();

    /*if(c.type == CAMERA_TRACKING_TYPE){
        newPosition[0] = p[0] - step*n[0];
        newPosition[1] = p[1] - step*n[1];
        newPosition[2] = p[2] - step*n[2];
    }
    else{*/
        newPosition[0] = p[0];
        newPosition[1] = p[1];
        newPosition[2] = p[2] - step;
    //}

    c.setPosition(newPosition);
    c.steps = s;
	}

	setPosition(p){
		this.position = vec3.fromValues(p[0], p[1], p[2]);
    this.update();
	}

	setAzimuth(az){
		this.changeAzimuth(az - this.azimuth);
	}
	changeAzimuth(az){
    this.azimuth +=az;

    if (this.azimuth > 360 || this.azimuth <-360) {
		this.azimuth = this.azimuth % 360;
	}
    this.update();
	}
	setElevation(el){
		this.changeElevation(el - this.elevation);
	}
	changeElevation(el){
		this.elevation +=el;

    if (this.elevation > 360 || this.elevation <-360) {
		this.elevation = this.elevation % 360;
	}
    this.update();
	}
	update(){
		//para la orbiting
		mat4.identity(this.matrix);
		mat4.rotateY(this.matrix, this.matrix, this.azimuth * Math.PI/180);
		mat4.rotateX(this.matrix, this.matrix, this.elevation * Math.PI/180);
		mat4.translate(this.matrix, this.matrix, this.position);

		var m = this.matrix;
		let aux = mat4.create();
		mat4.identity(aux);
		mat4.multiply(this.matrix, aux,m);
	}

	getViewTransform(){
		var m = mat4.create();
    mat4.inverse(this.matrix, m);
    return m;
	}
	//fovy => Angulo de vision en radianes
	//aspect => Relacion de aspecto
	setPerspectiva (fovy, aspect, near, far){
		this.esPrespectiva = true;
		let out = mat4.create();
		mat4.perspective(out, fovy, aspect, near, far)
		this.projectionMatrix = out;
		this.cercano = near;
		this.lejano = far;
	}

	//left, right y top ?????
	setParalela (near, far, left, right, top){
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
	getTipo(){
		return this.esPrespectiva;
	}


	beginDraw(){}
	endDraw(){}

}
