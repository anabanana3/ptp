class TRecursoMaterial extends TRecurso{

  constructor(){
    super();
    this.colorDifuso;
    this.colorEpecular;
    this.colorAmbiente;
    this.iluminacion;
    this.transparencia;
    this.intensidad;
  }
  //buscar estructura archivos .mtl leerlo y cargarlo como hacemos con la TRecursoMalla
  //almacenar color difuso, color especular, etc

  request(url) {
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
    let datos;
    let request = this.request('/assets/motor/' + nombre).then((e) => {
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
      let colorEpecular = vec3.fromValues(valoresKs[1], valoresKs[2], valoresKs[3]);
      this.colorEpecular = colorEpecular;
      //console.log(this.colorEpecular);

      //el frag_color es la suma de a, d, s y otr cosa que no se que es jeje
      this.intensidad = vec3.fromValues(1,1,1);
      //le paso las 3 coordenadas de la suma de los colores y la transparencia

      //Guardo los valores del material para mandarlos al shader
      GDifuso = this.colorDifuso;
      GAmbiental = this.colorAmbiente;
      GEspecular = this.colorEpecular;
      GBrillo = this.iluminacion;
      GIntensidadLuz = this.intensidad;
    })
  }
}
