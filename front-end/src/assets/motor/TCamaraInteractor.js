class TCamaraInteractor extends TEntidad {
  //hemos creado esta nueva clase para registrar el movimiento del raton por el canvas
  //nos hemos basado en el capitulo 4 (camara) del libro webgl, y en los ejemplos del mismo
  constructor(camera,canvas){
      super();
      this.camera = camera;
      this.canvas = canvas;
      this.update();

      this.dragging = false;
      this.x = 0;
      this.y = 0;
      this.lastX = 0;
      this.lastY = 0;
      this.button = 0;
      this.ctrl = false;
      this.key = 0;

      this.MOTION_FACTOR = 10.0;
  }
  //cuando soltamos el raton
  onMouseUp(ev){
      this.dragging = false;
  }
  //cuando mantenemos pulsado el ratón
  onMouseDown(ev){
    this.dragging = true;
    this.x = ev.clientX;
  	this.y = ev.clientY;
  	this.button = ev.button;
  }
  //cuando movemos el raton
  onMouseMove(ev){
  	this.lastX = this.x;
  	this.lastY = this.y;
  	this.x = ev.clientX;
    this.y = ev.clientY;
    //para que si no estamos pulsando y solo movemos no haga nada
  	if (!this.dragging) return;

  	this.ctrl = ev.ctrlKey;
  	this.alt = ev.altKey;

  	var dx = this.x - this.lastX;
  	var dy = this.y - this.lastY;

  	if (this.button == 0) {
      //llamamos a rotar
  			this.rotate(dx, dy);
  	}
  }
  //cuando apretamos una tecla -para el zoom
  onKeyDown(ev){
    var c = this.camera;

  	this.key = ev.keyCode;
  	this.ctrl = ev.ctrlKey;
    //tecla +
  	if(this.key == 187){
      this.zoomIn();
      //tecla -
    }else if(this.key == 189){
      this.zoomOut();
    }
  }

  onKeyUp(ev){
      if (ev.keyCode == 17){
    		this.ctrl = false;
    	}
  }

  update(){
    var self = this;
  	var canvas = this.canvas;
    canvas.onmousedown = function(ev) {
  		self.onMouseDown(ev);
    }

    canvas.onmouseup = function(ev) {
  		self.onMouseUp(ev);
    }

  	canvas.onmousemove = function(ev) {
  		self.onMouseMove(ev);
    }
  }
  //calculamos las variables para aplicar la rotacion
  rotate(dx, dy){
  	var camera = this.camera;
  	var canvas = this.canvas;

  	var delta_x = -8.0 / canvas.height;
  	var delta_y   = -8.0 / canvas.width;

  	var nY = dx * delta_y * this.MOTION_FACTOR;
  	var nX = dy * delta_x * this.MOTION_FACTOR;

  	camera.changeMovimentoY(nY);
  	camera.changeMovimientoX(nX);
    camera.update();
  }
}
