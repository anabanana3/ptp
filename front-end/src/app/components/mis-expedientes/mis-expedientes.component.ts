import { Component, ElementRef, AfterViewInit, NgZone, ViewChild, OnInit} from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';
import { CarpetasService } from '../../services/carpetas.service';

import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-mis-expedientes',
  templateUrl: './mis-expedientes.component.html'
})

// TODO: Recoger todos los expedientes de un usuario no solo los provados y luego hacer un boton para obtener publicos/privados

export class MisExpedientesComponent implements OnInit {

  expedientes = new Array();
  //Para la paginacion
  paginas = new Array();
  pagNext:number;
  pagBack:number;
  pagActual:number;
  tamPag:number=10;
  error:boolean=true;
  busqueda:boolean = false;
  mensaje:string='';
//Url para hacer las busquedas
  url:string='';
//Variable con el ID_Usuario
idU = sessionStorage.iD;

//Variables para filtar los expedientes
etnias = new Array();
  n:number = 1;
  //Variable para mostrar expedientes publicos, privados o ambos => 1:privados, 2:publicos, 3:ambos
  tipoExp:number=1;
  tiposMGF = new Array();
    Filtros ={
    Titulo:'',
    Fecha1:'',
    Fecha2:'',
    Lugar:'',
    Etnia:0,
    TipoMGF:0,
  }

  carpetas = new Array();
  //Variable que va almacenar el contenido de una carpeta tanto EXP como Carpetas
  contenido = new Array();
  raiz;
  carpetaActual = null;
  NameRuta = new Array();

  asociacion:boolean = false;
  admin:boolean = false;
  usuario:boolean = false;

  carpetaSelect = null;
  nombreSelect='';

  mostrarForm:boolean = false;


  sitio;
  idSitio;
  @ViewChild('place') public searchElement: ElementRef;

  constructor(private _expedientesService:ExpedientesService, private _carpetaService:CarpetasService,private element:ElementRef, private ngZone:NgZone, private mapsAPILoader: MapsAPILoader) {
    if(sessionStorage.length == 0){
      return;
    }else{
      this.error = false;

      if(sessionStorage.getItem('asociacion') != null){
        this.asociacion = true;
      }else if(sessionStorage.getItem('usuario') != null){
        this.usuario = true;
      }else if(sessionStorage.getItem('admin') != null){
        this.admin = true;
      }
      //Recupero las etnias para añadirlas al menu de busqueda
      this._expedientesService.getEtnias().subscribe(data=>this.etnias = data);
      this._expedientesService.getTipoMutilacion().subscribe(data=>this.tiposMGF = data);
      //Recupero los expedientes del usuario que ha iniciado sesion
      //this.getExpedientesUser(1,1,this.tamPag);
      if(sessionStorage.F2Titulo == undefined){
        //TODO: Obtengo la raiz del usuario que ha iniciado sesion
        this.getRaizUser(sessionStorage.iD);
        this.getExpedientesUser(1, this.tamPag, 1);
        console.log("hollaaaaaaa")
      }

      //para mantener la busqueda
      if(sessionStorage.F2Titulo != undefined){
        this.buscar2(1,10);
        console.log("ENTRO");
      }

    }
   }

   ngOnInit() {
    this.apiGoogle();
  }
  apiGoogle(){
    this.mapsAPILoader.load().then(
      () =>{
        this.sitio = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["geocode"] });

        this.sitio.addListener('place_change', () => {
            this.ngZone.run(()=>{
              let place: google.maps.places.PlaceResult = this.sitio.getPlace();
              this.idSitio = place.id;
              if(place.geometry === undefined || place.geometry === null){
                return
              }
            });
        })
      }
    );
  }


elegirTipo(tipo){
   switch(tipo){
     case 1:
       this.tipoExp = 1;
       document.getElementById("privF").style.fontWeight = "bold";
       document.getElementById("publF").style.fontWeight = "normal";
     break;
     case 2:
       this.tipoExp = 2;
       document.getElementById("privF").style.fontWeight = "normal";
       document.getElementById("publF").style.fontWeight = "bold";
     break
   }
 }


mostrarOpciones() {
    var x = document.getElementById("desplegable");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

mostrarOpThreePoints(id){

  var x = document.getElementById(id);
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}

openPopUp(){
    // Get the modal
  var modal = document.getElementById('popupBorrarExp');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtnDeleteExp");
  var btnNo = document.getElementById("noBorrarExp");

  // Get the <span> element that closes the modal
  var span = document.getElementById("closeExp");

  modal.style.display = "block";

  btnNo.onclick = function(){
    //Boton cancelar
    modal.style.display = "none";
    // this.getCarpeta(this.carpetaActual);
  }

  span.onclick = function() {
    //Boton con la X
      console.log("entro en span.onclick");
      modal.style.display = "none";
      // this.getCarpeta(this.carpetaActual);
  }
}

popUpBorrarCarpeta(idCarpeta){
    // Get the modal
  console.log("entro en popUpBorrarCarpeta");
  var modal = document.getElementById('popupBorrarCarpeta');

  this.carpetaSelect = idCarpeta;

  // Get the button that opens the modal
  var btn = document.getElementById("myBtnDeleteCarpeta");
  var btnNo = document.getElementById("noBorrarCarpeta");

  // Get the <span> element that closes the modal
  var span = document.getElementById("closeCarpeta");

  modal.style.display = "block";

  btnNo.onclick = function(){
    //Boton cancelar
    modal.style.display = "none";
    // this.getCarpeta(this.carpetaActual);
  }

  span.onclick = function() {
    //Boton con la X
      console.log("entro en span.onclick");
      modal.style.display = "none";
      // this.getCarpeta(this.carpetaActual);
  }
}


popUpModificarCarpeta(idCarpeta, nombre){
  // Get the modal
  this.carpetaSelect = idCarpeta;
  this.nombreSelect = nombre;

  console.log("entro en popUpModificarCarpeta");
  console.log("Nombre anterior: " + nombre);
  var modal = document.getElementById('popupModificarCarpeta');

  var btn = document.getElementById("myBtnModifyCarpeta");

  var span = document.getElementById("closeModifyCarpeta");

  modal.style.display = "block";

  span.onclick = function() {
    //Boton con la X
      console.log("entro en span.onclick");
      modal.style.display = "none";
      // this.getCarpeta(this.carpetaActual);
  }
}

getExpedientesUser(tipo,pag, tam){
  console.log(tipo);
  switch (tipo){
    case 1:
      //Modo Arbol
      this.getRaizUser(sessionStorage.iD);
    break;
    case 2:
      //Privados
      this._expedientesService.getExpedientesPrivUser(pag, tam).subscribe(data =>{
        if(data.Resultado == 'OK' || data == ''){
            // this.expedientes = new Array();
            this.contenido = new Array();
            this.mensaje = 'No tienes almacenado ningún expediente privado';
            document.getElementById('alert').className = 'alert alert-danger';
        }else{
          if(data.Codigo == 501){
            location.href ='/expired';
          }else{
            this.contenido = data.Data;
            // this.expedientes = data.Data;
            console.log('Resultado de la funcion aux privados');
            console.log(data);
            this.paginacion(data.Pagina, data.Paginas_Totales);
          }
        }
        });
    break;
    case 3:

      //Los publicos
      this._expedientesService.getExpedientesPubUser(pag,tam).subscribe(data=>{
        if(data.Resultado == 'OK' || data == ''){
          // this.expedientes = new Array();
          this.contenido = new Array();
          console.log('Todavia no tienes alamcenado nada publico');
          this.mensaje = 'No tienes expediente públicos';
          document.getElementById('alert').className = 'alert alert-danger';
        }else{
          if(data.Codigo == 501){
            location.href = '/expired';
          }else{
            // this.expedientes = data.Data;
            this.contenido = data.Data;
            console.log('Resultado de la funcion aux publicos');
            console.log(data);
            this.paginacion(data.Pagina, data.Paginas_Totales);
          }
        }
      })
    break;
  }

}


buscar(pag, tamPag=this.tamPag){
    console.log(this.Filtros);
    console.log('Muestro el estado de la url antes de pillar los datos');
    console.log(this.url);
    console.log('Muestro el tipo de expediente que voy a buscar');
    console.log(this.tipoExp);
    if(this.tipoExp)
    sessionStorage.setItem('F2TipoExp', this.tipoExp.toString());
    sessionStorage.setItem('F2Titulo', this.Filtros.Titulo);
    sessionStorage.setItem('F2Fecha1', this.Filtros.Fecha1);
    sessionStorage.setItem('F2Fecha2', this.Filtros.Fecha2);
    //Obtengo los datos de google maps
    this.Filtros.Lugar = null;
    if(this.sitio.gm_accessors_.place.gd.b ==true && this.sitio.gm_accessors_.place.gd.l != ''){
      let idLugar = this.sitio.gm_accessors_.place.gd.place.id;
      this.Filtros.Lugar = idLugar;
      sessionStorage.setItem('F2Lugar', idLugar);
    }else{
      sessionStorage.setItem('F2Lugar', null);
    }
    //creo que esto no es necesario - undefined
    if(this.Filtros.Etnia !== undefined){
      sessionStorage.setItem('F2Etnia', this.Filtros.Etnia.toString());
    }
    if(this.Filtros.TipoMGF !== undefined){
      sessionStorage.setItem('F2TipoMGF', this.Filtros.TipoMGF.toString());
    }
    //Cambiar la URL en funcion del tipo seleccionado
    this.url='https://www.aisha.ovh/api/privados/user='+sessionStorage.iD+'/search/';
    if(this.tipoExp == 2){
      //Busco expedientes publicos
      this.url='https://www.aisha.ovh/api/publicos/user='+sessionStorage.iD+'/search/';
    }
    console.log(this.url);
    let primero = 1;
    if(this.Filtros.Titulo != ''){
      //No son nulos => los pongo tal cual
      this.url += 'titulo='+sessionStorage.F2Titulo;
    }else{
      this.url += 'titulo='+null;
    }
    if(this.Filtros.Fecha1 != ''){
      this.url += '&f1='+sessionStorage.F2Fecha1;
    }else{
      this.url += '&f1='+null;
    }
    if(this.Filtros.Fecha2 != ''){
      this.url += '&f2='+sessionStorage.F2Fecha2;
    }else{
      this.  url += '&f2='+null;
    }
    //Lugar
    if(this.Filtros.Lugar != null){
      // this.url += '&l='+sessionStorage.F2Lugar;
      this.url += '&l='+this.Filtros.Lugar;
    }else{
      this.url += '&l='+null;
    }
    //Etnia
    if(this.Filtros.Etnia != 0){
      this.url += '&e='+sessionStorage.F2Etnia
    }else{
      this.  url += '&e='+null;
    }
    //TipoMGF
    if(this.Filtros.TipoMGF != 0){
      this.url += '&tipo='+sessionStorage.F2TipoMGF;
    }else{
      this.url += '&tipo='+null;
    }

   //Añado los parametros de la paginacion
   this.url += '/pag='+pag+'&n='+tamPag;

   console.log('Muestro la url que mando al servicio');
   console.log(this.url);

   this._expedientesService.buscar2Exp(this.url).subscribe(data=>{
     console.log(data);
     if(data.Resultado == 'OK'){
       console.log('No hay resultados');
      //  this.expedientes = new Array();
       this.contenido  = new Array();
       //Falta mostrar mensaje de no hay resultados
       this.busqueda = true;
       this.mensaje = 'No hay resultados para la busqueda solicitada';
       if(document.getElementById('alert'))
        document.getElementById('alert').className = 'alert alert-danger';
       //return;
     }else{
       if(data.Codigo == 501){
         location.href = '/expired';
       }else{
         console.log('Hay busqueda');
         this.busqueda = true;
         //this.expedientes = data.Data;
         this.contenido = data.Data;
         this.mensaje = '';
         this.paginacion(data.Pagina, data.Paginas_Totales);
       }
      }
   });
  }

  buscar2(pag, tamPag=this.tamPag){
    //metodo para mantener la busqueda anterior
    this.tipoExp = sessionStorage.F2TipoExp;
    this.Filtros.Titulo = sessionStorage.F2Titulo;
    this.Filtros.Fecha1 = sessionStorage.F2Fecha1;
    this.Filtros.Fecha2 = sessionStorage.F2Fecha2;
    this.Filtros.Lugar = sessionStorage.F2Lugar;
    this.Filtros.Etnia = sessionStorage.F2Etnia;
    this.Filtros.TipoMGF = sessionStorage.F2TipoMGF;
    //Cambiar la URL en funcion del tipo seleccionado
    this.url='https://www.aisha.ovh/api/privados/user='+sessionStorage.iD+'/search/';
    if(this.tipoExp == 2){
      //Busco expedientes privados
      this.url='https://www.aisha.ovh/api/publicos/user='+sessionStorage.iD+'/search/';
    }
    console.log(this.url);
    let primero = 1;
    if(this.Filtros.Titulo != ''){
      //No son nulos => los pongo tal cual
      this.url += 'titulo='+sessionStorage.F2Titulo;
    }else{
      this.url += 'titulo='+null;
    }
    if(this.Filtros.Fecha1 != ''){
      this.url += '&f1='+sessionStorage.F2Fecha1;
    }else{
      this.url += '&f1='+null;
    }
    if(this.Filtros.Fecha2 != ''){
      this.url += '&f2='+sessionStorage.F2Fecha2;
    }else{
      this.  url += '&f2='+null;
    }
    //Lugar
    if(this.Filtros.Lugar != ''){
      this.url += '&l='+sessionStorage.F2Lugar;
    }else{
      this.url += '&l='+null;
    }
    //Etnia
    if(this.Filtros.Etnia != 0){
      this.url += '&e='+sessionStorage.F2Etnia
    }else{
      this.  url += '&e='+null;
    }
    //TipoMGF
    if(this.Filtros.TipoMGF != 0){
      this.url += '&tipo='+sessionStorage.F2TipoMGF;
    }else{
      this.url += '&tipo='+null;
    }

   //Añado los parametros de la paginacion
   this.url += '/pag='+pag+'&n='+tamPag;

   console.log('Muestro la url que mando al servicio');
   console.log(this.url);

   this._expedientesService.buscar2Exp(this.url).subscribe(data=>{
     console.log(data);
     if(data.Resultado == 'OK'){
       console.log('No hay resultados');
      //  this.expedientes = new Array();
       this.contenido  = new Array();
       //Falta mostrar mensaje de no hay resultados
       this.busqueda = true;
       this.mensaje = 'No hay resultados para la busqueda solicitada';
       document.getElementById('alert').className = 'alert alert-danger';
       //return;
     }else{
       if(data.Codigo == 501){
         location.href = '/expired';
       }else{
         console.log('Hay busqueda');
         this.busqueda = true;
         //this.expedientes = data.Data;
         this.contenido = data.Data;
         this.mensaje = '';
         this.paginacion(data.Pagina, data.Paginas_Totales);
       }
      }
   });
  }
  borrarBusqueda(){
    this.Filtros.Titulo = "";
    sessionStorage.F2Titulo = "";
    this.Filtros.Fecha1 = "";
    sessionStorage.F2Fecha1 = "";
    this.Filtros.Fecha2 = "";
    sessionStorage.F2Fecha2 = "";
    this.Filtros.Lugar = "";
    sessionStorage.F2Lugar = "";
    this.Filtros.Etnia = 0;
    sessionStorage.F2Etnia = "";
    this.Filtros.TipoMGF = 0;
    sessionStorage.F2TipoMGF = 0;
    this.getRaizUser(sessionStorage.iD);
    this.getExpedientesUser(1, this.tamPag, 1);
  }
  //Funcion para generar las variables de la paginacion
  paginacion( paginaActual , pagTotales){
    //Total de paginas
    this.paginas = [];
    for(let i=0; i<pagTotales; i++){
      this.paginas.push(i);
    }
    //Pagina anterior
    if(paginaActual >= 2){
      this.pagBack = (paginaActual-1);
    }else{
      this.pagBack = paginaActual;
    }
    //Pagina Siguiente
    if(paginaActual < pagTotales){
      this.pagNext = (paginaActual+1);
    }else{
      this.pagNext = paginaActual;
    }
  }

  pasarPagina(pag){

    if(this.busqueda == false){
      console.log('No se ha buscado nada');
      this.getExpedientesUser(this.tipoExp,pag, this.tamPag);
      this.pagActual = pag;
    }else{
      console.log('Hay busqueda. Como paso la pagina de la busqueda');
      this.buscar(pag);
    }
  }

//GESTION DE LA CARPETAS
// TODO: Obtengo la raiz del usuario

getRaizUser(id){
  this._carpetaService.getRaizUser(id).subscribe(data=>{
    if(data.Codigo == 501){
      location.href = '/expired';
      return;
    }
    // document.getElementById('arb').style.fontWeight = 'bold';
    document.getElementById('privF').style.fontWeight = 'bold';
    console.log(data);
    this.contenido = data.Data;
    this.carpetaActual = data.ID_Carpeta;
    //Reinicio la paginacion
    this.paginas = new Array();
    // this.expedientes = new Array();
    this.NameRuta = new Array();
  })
}

getCarpeta(id, name){
  //if(this.carpetaActual != id){
    this.carpetaActual = id;
    this._carpetaService.getCarpeta(id).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return
      }
      this.carpetaActual = id;
      //this.Ruta.push(id);
      this.actualizarRuta(id, name);
      if(data.Codigo==405){
        //Carpeta vacia
        this.mensaje = 'La carpeta que has selecionado esta vacia'
        this.contenido = new Array();
        return
      }
      console.log(data);
      this.contenido = data;
    })
  //}
}

getCarpetasUser(idU){
  this._carpetaService.getCarpetasUser(idU).subscribe(data =>{
    if(data.Codigo == 501){
      location.href = '/expired';
      return;
    }
    console.log(data);
    this.carpetas = data.Data;
    console.log(this.carpetas);
    console.log(this.carpetas.length);
  })
}

nuevaCarpeta(nombre){
  //TODO => Abrir un PopUp para crear la carpeta con el nombre que queramos => Tener en cuenta la carpeta actual en la que nos encontramos
  console.log("Nombre de la carpeta" + nombre);
  this._carpetaService.newCarpeta(nombre, this.carpetaActual).subscribe(data =>{
    if(data.Codigo == 501){
      location.href = '/expired';
      return;
    }
    console.log(data);
    this.getCarpeta(this.carpetaActual, nombre);
  })
}

borrarCarpeta(){
  // console.log(idC);
  this._carpetaService.deleteCarpeta(this.carpetaSelect).subscribe(data =>{
    if(data.Codigo == 501){
      location.href = '/expired';
      return
    }
    console.log(data);
    this.getCarpeta(this.carpetaActual, this.NameRuta[this.NameRuta.length]);
  })
}

modificarCarpeta(nombre){
  console.log("MODIFICAR CARPETA");
  var modal = document.getElementById('popupModificarCarpeta');

  this._carpetaService.updateCarpeta(nombre, this.carpetaSelect).subscribe(data=>{
    if(data.Codigo == 501){
      location.href = '/expired';
    }
    console.log(data);
    this.getCarpeta(this.carpetaActual, this.NameRuta[this.NameRuta.length]);
  })

  modal.style.display="none";

}

actualizarRuta(id, name){
  console.log('actualizarRuta');
  console.log('Ruta', this.NameRuta);
  console.log('CarpetaActual', this.carpetaActual);
  console.log(this.carpetaActual);
  let pos=-1;
  for(let i=0; i<this.NameRuta.length && pos ==-1; i++){
    console.log('iteracion numero', i );
    console.log(this.NameRuta[i].ID_Carpeta);
    if(this.NameRuta[i].ID_Carpeta == id){
      pos = i;
    }
  }

  console.log(pos)
  if(pos == -1){
    let aux = {
      ID_Carpeta: id,
      Nombre: name
    }
    this.NameRuta.push(aux);
  }else{
    //Borro todo lo que haya en el array hasta la pos empezando por el final
    for(let i = this.NameRuta.length-1; i>pos; i--){
      this.NameRuta.pop();
    }
  }
}
mostrarFilters(){
  this.mostrarForm = !this.mostrarForm;
  if(this.mostrarForm){
    document.getElementById("formFilter").className="mostrar-form";
    document.getElementById("lateralSearch").className="lateralSearch mostrar-lateralSearch";
    document.getElementById("divContainer").className="carpetasDivContainer ocultar-carpetasDivContainer";
  }
  else{
    document.getElementById("formFilter").className="ocultar-form";
    document.getElementById("lateralSearch").className="lateralSearch ocultar-lateralSearch";
    document.getElementById("divContainer").className="carpetasDivContainer mostrar-carpetasDivContainer";
  }
}

}
