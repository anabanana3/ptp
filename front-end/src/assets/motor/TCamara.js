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
		this.position = vec3.create();
		this.focus = vec3.create();
		this.interactor = null;
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

	setFocus(f){
		this.position = vec3.fromValues(f[0], f[1], f[2]);
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
	}

	setElevation(el){
		this.changeElevation(el - this.elevation);
	}

	changeElevation(el){
		this.elevation +=el;

    if (this.elevation > 360 || this.elevation <-360) {
			this.elevation = this.elevation % 360;
		}
	}

	update(){
		//para la orbiting
		// mat4.identity(this.matrix);
		// mat4.rotateY(this.matrix, this.matrix, this.azimuth * Math.PI/180);
		// mat4.rotateX(this.matrix, this.matrix, this.elevation * Math.PI/180);
		// mat4.translate(this.matrix, this.matrix, this.position);

		let rotaCamara = GFachada.regCamaras[0].getPadre().getPadre().entidad;
		let traslaCamara = GFachada.regCamaras[0].getPadre().entidad;
		console.log(this.azimuth * Math.PI/180);
		rotaCamara.rotar(this.azimuth * Math.PI/180, 0, 1, 0);
		rotaCamara.rotar(this.elevation * Math.PI/180, 1, 0, 0);
		traslaCamara.trasladar(this.position[0], this.position[1], this.position[2]);

		// rotaCamara.rotar(0.3, 0, 1, 0);
		GFachada.draw();
	}

	// getViewTransform(){
	// 	var m = mat4.create();
  //   mat4.inverse(this.matrix, m);
  //   return m;
	// }

	//fovy => Angulo de vision en radianes
	//aspect => Relacion de aspecto
	setPerspectiva (fovy, aspect, near, far){
		this.esPrespectiva = true;
		let out = mat4.create();
		mat4.perspective(out, fovy, aspect, near, far)
		this.projectionMatrix = out;
		console.log(this.projectionMatrix);
		this.cercano = near;
		this.lejano = far;
	}

	//left, right y top ?????
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
	getTipo(){
		return this.esPrespectiva;
	}

	beginDraw(){}
	endDraw(){}

}
