class TCamaraInteractor extends TEntidad {
  /*hemos creado esta nueva clase para registrar el movimiento del raton por el canvas
  nos hemos basado en el capitulo 4 (camara) del libro webgl, y en los ejemplos del mismo
  para hacer que gire en las pantallas tactiles he utilizado como referencia la
  siguiente página: https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX */

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
      this.zoom = 0;

      this.count_zoomIn = 0;
      this.count_zoomOut = 0;
      this.aux_zoomIn = 6;
      this.aux_zoomOut = 5;

      this.MOTION_FACTOR = 10.0;
  }
  //cuando soltamos el raton
  onMouseUp(ev){
      this.dragging = false;
  }
  //cuando terminado de pulsar en la pantalla tactil (como mouseup)
  onTouchEnd(ev){
    this.dragging = false;
    console.log("END 2");
  }
  //cuando mantenemos pulsado el ratón
  onMouseDown(ev){
    this.dragging = true;
    this.x = ev.clientX;
  	this.y = ev.clientY;
  	this.button = ev.button;
  }
  //lo mismo que mousedown pero para el movil
  onTouchStart(ev){
    this.x = ev.touches[0].clientX;
  	this.y = ev.touches[0].clientY;
    console.log("START 2");
    console.log(ev.touches[0].clientX);
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
//cuando movemos el dedo por la pantalla tactil
  onTouchMove(ev){
    this.lastX = this.x;
  	this.lastY = this.y;
  	this.x = ev.touches[0].clientX;
    this.y = ev.touches[0].clientY;

  	var dx = this.x - this.lastX;
  	var dy = this.y - this.lastY;
    console.log("MOVE 2");

    //llamamos a rotar
		this.rotate(dx, dy);
  }
  //cuando apretamos una tecla -para el zoom
  onKeyDown(ev){
    var c = this.camera;

  	this.key = ev.keyCode;
  	this.ctrl = ev.ctrlKey;
    console.log(this.key);
    //tecla +
  	if(this.key == 187){
      this.zoomIn();
      //tecla -
    }else if(this.key == 189){
      this.zoomOut();
    }
    // else if(this.key == 39){
    //  tecla para mover el frame de la animacion
    //   GFrame++;
    //   GFachada.animaciones[0].draw();
    // }
  }

  onKeyUp(ev){
      if (ev.keyCode == 17){
    		this.ctrl = false;
    	}
  }
  //para ir llamando todo el rato a las funciones correspondientes para mover el modelo
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
    window.onkeydown = function(ev) {
      self.onKeyDown(ev);
    }
    window.onkeyup = function(ev) {
      self.onKeyUp(ev);
    }
    window.ontouchstart = function(ev){
      console.log("START");
      self.onTouchStart(ev);
    }
    window.ontouchmove = function(ev){
      console.log("MOVE");
      self.onTouchMove(ev);
    }
    window.ontouchend = function(ev){
      console.log("END");
      self.onTouchEnd(ev);
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
  //funcion para acercar el modelo
  zoomIn(){
    if(this.count_zoomIn < this.aux_zoomIn){
      for(let i=0; i<GFachada.objetos.length; i++){
        GFachada.escalar(GFachada.objetos[i], 1.2, 1.2, 1.2);
      }

      GFachada.trasladar(GFachada.regCamaras[0], 0.4, 0, 0);
      GFachada.draw();

      this.count_zoomIn++;
      this.aux_zoomOut++;
    }
  }
  //funcion para alejar el modelo
  zoomOut(){
    if(this.count_zoomOut < this.aux_zoomOut){
      for(let i=0; i<GFachada.objetos.length; i++){
        GFachada.escalar(GFachada.objetos[i], 0.8, 0.8, 0.8);
      }

      GFachada.trasladar(GFachada.regCamaras[0], -0.4, 0, 0);
      GFachada.draw();

      this.count_zoomOut++;
      this.aux_zoomIn++;
    }
  }
}
