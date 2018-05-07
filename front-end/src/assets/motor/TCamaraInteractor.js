class TCamaraInteractor extends TEntidad {

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

  onMouseUp(ev){
      this.dragging = false;
  }

  onMouseDown(ev){
    this.dragging = true;
    this.x = ev.clientX;
  	this.y = ev.clientY;
  	this.button = ev.button;
  }

  onMouseMove(ev){
  	this.lastX = this.x;
  	this.lastY = this.y;
  	this.x = ev.clientX;
    this.y = ev.clientY;

  	if (!this.dragging) return;

  	this.ctrl = ev.ctrlKey;
  	this.alt = ev.altKey;

  	var dx = this.x - this.lastX;
  	var dy = this.y - this.lastY;

  	if (this.button == 0) {
  		if(this.ctrl){
  			this.translate(dy);
  		}
  		else{
  			this.rotate(dx, dy);
  		}
  	}
  }

  onKeyDown(ev){
    var c = this.camera;

  	this.key = ev.keyCode;
  	this.ctrl = ev.ctrlKey;
    //tecla +
  	if(this.key == 187){
      this.zoomIn();
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

  	// window.onkeydown = function(ev){
  	// 	self.onKeyDown(ev);
  	// }

  	// window.onkeyup = function(ev){
  	// 	self.onKeyUp(ev);
  	// }
  }

  // translate(value){
  //   console.log("si que entro");
  // 	var c = this.camera;
  // 	var dv = 2 * this.MOTION_FACTOR * value / canvas.height;
  //
  // 	c.dolly(Math.pow(1.1,dv));
  // }

  rotate(dx, dy){
  	var camera = this.camera;
  	var canvas = this.canvas;

  	var delta_elevation = -8.0 / canvas.height;
  	var delta_azimuth   = -8.0 / canvas.width;

  	var nAzimuth = dx * delta_azimuth * this.MOTION_FACTOR;
  	var nElevation = dy * delta_elevation * this.MOTION_FACTOR;

  	camera.changeAzimuth(nAzimuth);
  	camera.changeElevation(nElevation);
    camera.update();
  }
}
