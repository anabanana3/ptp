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
    console.log("hola");
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
  			this.rotate(dx,dy);
  		}
  	}
  }

  onKeyDown(ev){
      var c = this.camera;

  	this.key = ev.keyCode;
  	this.ctrl = ev.ctrlKey;

  	if (!this.ctrl){
  		if (this.key == 38){
  			c.changeElevation(10);
  		}
  		else if (this.key == 40){
  			c.changeElevation(-10);
  		}
  		else if (this.key == 37){
  			c.changeAzimuth(-10);
  		}
  		else if (this.key == 39){
  			c.changeAzimuth(10);
  		}
          else if (this.key == 87) {  //w -wide
              if(fovy < 120) fovy+=5;
              console.info('FovY:'+fovy);
          }
          else if (this.key == 78) { //n - narrow
              if(fovy >15 ) fovy-=5;
              console.info('FovY:'+fovy);
          }
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
  }

  translate(value){

  	var c = this.camera;
  	var dv = 2 * this.MOTION_FACTOR * value / camera.view.canvas.height;

  	c.dolly(Math.pow(1.1,dv));
  }

  rotate(dx, dy){


  	var camera = this.camera;
  	var canvas = this.canvas;

  	var delta_elevation = -20.0 / canvas.height;
  	var delta_azimuth   = -20.0 / canvas.width;

  	var nAzimuth = dx * delta_azimuth * this.MOTION_FACTOR;
  	var nElevation = dy * delta_elevation * this.MOTION_FACTOR;

  	camera.changeAzimuth(nAzimuth);
  	camera.changeElevation(nElevation);
  }
}
