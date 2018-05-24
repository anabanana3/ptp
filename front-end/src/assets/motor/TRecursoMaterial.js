class TRecursoMaterial extends TRecurso{
  /*
  Clase TRecursoMaterial, la cual se crear al asignar un TRecurso de un material
  añadimos a este recurso todas las caracteristicas necesarias para luego pasarle al shader.
  */
  constructor(){
    super();
    this.colorDifuso;
    this.colorEspecular;
    this.colorAmbiente;
    this.iluminacion;
    this.transparencia;
    this.intensidad;
    this.uShininess = 23;
  }
  //buscar estructura archivos .mtl leerlo y cargarlo como hacemos con la TRecursoMalla
  //almacenar color difuso, color especular, etc

  request(url) {
    /*
    Creamos una promesa la cual cuando acabamos de cargar el fichero .mtl devuelve el resultado
    necesario por la sincronicidad de JS
    */
    return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = function(e){
        resolve(e.target.response);
      };
      req.onerror = function (e) {
        console.log(e);
      };
      req.send();
    });
  }

  cargarFichero(nombre){
    //metodo que carga un fichero .mtl a partir de un nombre pasado por parametro
    let datos;
    //llamamos al metodo anterior request pasandole por parametro la ruta del archivo
    let request = this.request('/assets/motor/' + nombre).then((e) => {
      /*
      una vez tenemos la informacion del archivo cargado hacemos un split() por partes
      para guardarnos los datos que queremos y creamos los vectores correspondientes
      para añadirlos luego al shader para mostrar el material
      */
      datos = e;
      let partes = datos.split('\n');
      //console.log(partes);
      //la d es el 5, Tr es el 6
      let d = partes[5].split(' ');
      let tr = partes[6].split(' ');
      let iluminacion = partes[8].split(' ');
      let valoresKa = partes[9].split(' ');
      let valoresKd = partes[10].split(' ');
      let valoresKs = partes[11].split(' ');

      this.iluminacion = iluminacion[1];
      //le paso la d, aunque en algunos sitios dicen que es tr
      this.transparencia = d[1];

      //colorAmbiente ka
      let colorAmbiente = vec3.fromValues(valoresKa[1], valoresKa[2], valoresKa[3]);
      this.colorAmbiente = colorAmbiente;
      //console.log(this.colorAmbiente);

      //color difuso kd
      let colorDifuso = vec3.fromValues(valoresKd[1], valoresKd[2], valoresKd[3]);

      this.colorDifuso = colorDifuso;
      //console.log(this.colorDifuso);

      //color especular ks
      let colorEspecular = vec3.fromValues(valoresKs[1], valoresKs[2], valoresKs[3]);
      this.colorEspecular = colorEspecular;
      //console.log(this.colorEpecular);

      //el frag_color es la suma de a, d, s y otr cosa que no se que es jeje
      this.intensidad = vec3.fromValues(1,1,1);
      //le paso las 3 coordenadas de la suma de los colores y la transparencia

      //Guardo los valores del material para mandarlos al shader
      this.colorDifuso = vec4.fromValues(this.colorDifuso[0],this.colorDifuso[1], this.colorDifuso[2],1.0);
      this.colorEspecular = vec4.fromValues(this.colorEspecular[0],this.colorEspecular[1], this.colorEspecular[2],1.0);
      this.colorAmbiente = vec4.fromValues(this.colorAmbiente[0],this.colorAmbiente[1], this.colorAmbiente[2],1.0);
    })
  }
}
