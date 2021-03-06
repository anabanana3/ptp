import { Component, OnInit, Inject } from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';
import { ComentarioService } from '../../services/comentario.service';
import { CarpetasService } from '../../services/carpetas.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-ver-expediente',
  templateUrl: './ver-expediente.component.html'
})
export class VerExpedienteComponent implements OnInit {

  error:boolean=true;

  expID:number;
  publico:boolean = false;
  expediente = new Array();
  bloque1 = new Array();
  bloque2 = new Array();
  bloque3 = new Array();
  bloque4 = new Array();
  bloque5 = new Array();
  curso:string;
  centro_Salud:string;
  b2Otros:string;
  partos = new Array();
  persona = new Array();
  madre = new Array();
  padre = new Array();
  indicadores = new Array();
  //nombreCM:{}[];
  nombreCM = new Array();
  nombreCN = new Array();
  auxM = new Array();
  auxN = new Array();
  formula = new Array();
  consecSalud1 = new Array();
  consecSalud2 = new Array();
  consecSalud4 = new Array();
  consecSalud5 = new Array();
  consecSalud6 = new Array();
  idPersona:number;
  //comentarios
  comentarios = [];
  comentario:string = '';
  tamPag = 10;
  paginas = new Array();
  pagNext;
  pagBack;
  pagActual;
  mensaje:string = '';
  sessionStorageID;
  estaCheck = false;
  labelPublico = "Publicar expediente";
  coment = 0;
  estaComent = false;


  asociacion:boolean = false;
  admin:boolean = false;
  usuario:boolean = false;

  verComentarios:boolean = false;

  carpetas;

  movResult = 0;

  constructor(
    private _expedientesService:ExpedientesService, private router:ActivatedRoute,public router2: Router,
    public dialog: MatDialog, private _comentarioService:ComentarioService, private _carpetasService:CarpetasService) {
      if(sessionStorage.length === 0){
        return;
      }
      this.error = false;
      this.getComentarios();


      if(sessionStorage.getItem('asociacion') != null){
        this.asociacion = true;
      }else if(sessionStorage.getItem('usuario') != null){
        this.usuario = true;
      }else if(sessionStorage.getItem('admin') != null){
        this.admin = true;
      }

      this._carpetasService.getCarpetasUser(sessionStorage.iD).subscribe(data=>{
        console.log('Muestro las carpetas del usuario');
        this.carpetas = data;
        console.log(this.carpetas);
      })

  }

  getComentarios(){
    this._comentarioService.getComentariosByExpediente(this.router.snapshot.params['id'], 1, this.tamPag)
    .subscribe(data => {
      if(data.Codigo == 501){
        location.href ='/expired';
      }else{
        this.comentarios = data.Data;
        this.paginacion(this.pagActual, data.Paginas_Totales);
      }
    })
    this.sessionStorageID = sessionStorage.iD;
  }

  ngOnInit() {
    //obtenemos el id del exp que queremos ver
    this.expID = this.router.snapshot.params['id'];
    this._expedientesService.getExpedienteById(this.expID).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        this.expediente = data;
        this.idPersona = data[0].ID_Persona;
        this._expedientesService.getPersonaById(this.idPersona).subscribe(data=>{
          if(data[0] && data[0].Etnia.split(' ')[0] == 0){
            // data[0].Etnia = "No hay datos registrados";
            data[0].Etnia = "Desconoce la etnia de procedencia";
          }
          this.persona = data;
          //console.log(data);
        })
        //familiares de la persona
        this._expedientesService.getFamiliarPersona(this.idPersona).subscribe(data=>{
          for(let i = 0; i< data.length; i++){
            if(data[i] && data[i].Etnia.split(' ')[0] == 0){
              // data[0].Etnia = "No hay datos registrados";
              data[i].Etnia = "Desconoce la etnia de procedencia";
            }
            if(data[i].Tipo == 1){
              this.madre.push(data[i]);
            }else if(data[i].Tipo == 2){
              this.padre.push(data[i]);
            }
          }
        })
      }
    })
    //obtenemos datos b1
    this._expedientesService.getBloque1(this.expID).subscribe(data=>{
    if(data[0] && data[0].Otros == "''"){
      data[0].Otros = "No hay datos registrados";
    }
    else if(data[0] && data[0].Otros != "''"){
      data[0].Otros = data[0].Otros.split("'")[1];
    }
    if(data[0] && data[0].Acomp_O == "''"){
      data[0].Acomp_O = "No hay datos registrados";
    }
    else if(data[0] && data[0].Acomp_O != "''"){
      data[0].Acomp_O = data[0].Acomp_O.split("'")[1];
    }
    this.bloque1 = data;
    })
    //obtenemos datos b2
    this._expedientesService.getBloque2(this.expID).subscribe(data=>{
    if(data[0]){
      //SIGNIFICADO
      if(data[0].Significado_MGF !="''"){
       data[0].Significado_MGF = data[0].Significado_MGF.split("'")[1];
      }else if(data[0].Significado_MGF =="''"){
       data[0].Significado_MGF = "No hay datos registrados";
     }
     //FORMATO INT
     if(data[0].Formato_intervencion !="''"){
       data[0].Formato_intervencion = data[0].Formato_intervencion.split("'")[1];
      }else if(data[0].Formato_intervencion =="''"){
       data[0].Formato_intervencion = "No hay datos registrados";
     }
     //CONSEJOS
     if(data[0].Consejos !="''"){
       data[0].Consejos = data[0].Consejos.split("'")[1];
      }else if(data[0].Consejos =="''"){
       data[0].Consejos = "No hay datos registrados";
     }
   }
   this.bloque2 = data;
   if(data.lenght > 0 && data[0].Otros != "''"){
       this.b2Otros = data[0].Otros.split("'")[1];
     }else{
       this.b2Otros = "No hay datos registrados";
   }
    })
    //obtenemos los partos del exp
    this._expedientesService.getPartos(this.expID).subscribe(data=>{
      this.partos = data;
      //this.b2Otros = data[0].Otros.split("'")[1];
      //console.log('partos: '+this.partos);
      for(let i =0; i< this.partos.length; i++){
        //obtenemos las consecuencias del opart
        this._expedientesService.getConsecM(this.partos[i].ID_Parto).subscribe(dataM=>{
          this.auxM.push(dataM);
        })
        // ESTA PUTA MIERDA ESTA MAL HECHA
        this._expedientesService.getConsecN(this.partos[i].ID_Parto).subscribe(dataN=>{
          this.auxN.push(dataN);
        })
      }
    })
    this._expedientesService.getBloque3(this.expID).subscribe(data=>{
      if(data[0]){
        //PROPIAS
        if(data[0].Exp_propias != "''"){
          data[0].Exp_propias = data[0].Exp_propias.split("'")[1];
        }else if(data[0].Exp_propias == "''"){
          data[0].Exp_propias = "No hay datos registrados";
        }
        //TERCEROS
        if(data[0].Exp_terceros != "''"){
          data[0].Exp_terceros = data[0].Exp_terceros.split("'")[1];
        }else if(data[0].Exp_terceros == "''"){
          data[0].Exp_terceros = "No hay datos registrados";
        }
        //WHY?
        if(data[0].Mant_MGF_texto != "''"){
          data[0].Mant_MGF_texto = data[0].Mant_MGF_texto.split("'")[1];
        }else if(data[0].Mant_MGF_texto == "''"){
          data[0].Mant_MGF_texto = "No hay datos registrados";
        }
        //CONSEC M
        if(data[0].Otros_consecM != "''"){
          data[0].Otros_consecM = data[0].Otros_consecM.split("'")[1];
        }else if(data[0].Otros_consecM == "''"){
          data[0].Otros_consecM = "No hay datos registrados";
        }
        //CONSEC H
        if(data[0].Otros_consecH != "''"){
          data[0].Otros_consecH = data[0].Otros_consecH.split("'")[1];
        }else if(data[0].Otros_consecH == "''"){
          data[0].Otros_consecH = "No hay datos registrados";
        }
        //INTERVENCION
        if(data[0].Formato_int != "''"){
          data[0].Formato_int = data[0].Formato_int.split("'")[1];
        }else if(data[0].Formato_int == "''"){
          data[0].Formato_int = "No hay datos registrados";
        }
        //CONSEJO
        if(data[0].Consejo != "''"){
          data[0].Consejo = data[0].Consejo.split("'")[1];
        }else if(data[0].Consejo == "''"){
          data[0].Consejo = "No hay datos registrados";
        }
      }
      this.bloque3 = data;
      //console.log('b3: '+this.bloque3);
    })
    this._expedientesService.getBloque4(this.expID).subscribe(data=>{
      if(data[0]){
        if(data[0].ID_Mutilacion == 1){
          data[0].ID_Mutilacion = "Tipo 1";
        }else if(data[0].ID_Mutilacion == 2){
          data[0].ID_Mutilacion = "Tipo 2";
        }else if(data[0].ID_Mutilacion == 3){
          data[0].ID_Mutilacion = "Tipo 3";
        }else if(data[0].ID_Mutilacion == 4){
          data[0].ID_Mutilacion = "Tipo 4";
        }else if(data[0].ID_Mutilacion == 5){
          data[0].ID_Mutilacion = "No hay datos registrados";
        }else if(data[0].ID_Mutilacion == 6){
          data[0].ID_Mutilacion = "Otro";
        }
        //ELAST
        if(data[0].Elasticidad != "''"){
          data[0].Elasticidad = data[0].Elasticidad.split("'")[1];
        }else if(data[0].Elasticidad == "''"){
          data[0].Elasticidad = "No hay datos registrados";
        }
        //DESC
        if(data[0].Descripcion != "''"){
          data[0].Descripcion = data[0].Descripcion.split("'")[1];
        }else if(data[0].Descripcion == "''"){
          data[0].Descripcion = "No hay datos registrados";
        }
        //OTROS
        if(data[0].Otros != "''"){
          data[0].Otros = data[0].Otros.split("'")[1];
        }else if(data[0].Otros == "''"){
          data[0].Otros = "No hay datos registrados";
        }
        //FORMATO INT
        if(data[0].Formato_int != "''"){
          data[0].Formato_int = data[0].Formato_int.split("'")[1];
        }else if(data[0].Formato_int == "''"){
          data[0].Formato_int = "No hay datos registrados";
        }
        //CONSEJOS
        if(data[0].Consejos != "''"){
          data[0].Consejos = data[0].Consejos.split("'")[1];
        }else if(data[0].Consejos == "''"){
          data[0].Consejos = "No hay datos registrados";
        }
      }
      this.bloque4 = data;
    })
    this._expedientesService.getBloque5(this.expID).subscribe(data=>{
      if(data[0]){
        //FORMATO INT
        if(data[0].Intervencion != "''"){
          data[0].Intervencion = data[0].Intervencion.split("'")[1];
        }else if(data[0].Intervencion == "''"){
          data[0].Intervencion = "No hay datos registrados";
        }
        //CONSEJOS
        if(data[0].Consejos != "''"){
          data[0].Consejos = data[0].Consejos.split("'")[1];
        }else if(data[0].Consejos == "''"){
          data[0].Consejos = "No hay datos registrados";
        }
      }
      this.bloque5 = data;
    })
    this._expedientesService.getTieneConsecSalud(this.expID).subscribe(data=>{
      for(let i=0; i<data.length; i++){
        if(data[i].Tipo == 1){
          this.consecSalud1.push(data[i]);
        }else if(data[i].Tipo == 2){
          this.consecSalud2.push(data[i]);
        }else if(data[i].Tipo == 4){
          this.consecSalud4.push(data[i]);
        }else if(data[i].Tipo == 5){
          this.consecSalud5.push(data[i]);
        }else if(data[i].Tipo == 6){
          this.consecSalud6.push(data[i]);
        }
      }
    })
    this._expedientesService.getIndicadoresById(this.expID).subscribe(data=>{
      this.indicadores=data;
    })
    this._expedientesService.getExpedientesPubById(this.expID).subscribe(data=>{
      //this.indicadores=data;
      this.publico = false;
      if(data.length >0 && data[0].ID_Publico == this.expID){
        console.log(data[0].ID_Publico);
        this.publico = true;
        this.mostrarComentarios(this.expID);
        this._expedientesService.getComents(this.expID).subscribe(data=>{
          if(data[0].Comentario == 0){
            this.estaComent = false;
          }else{
            this.estaComent = true;
          }
        })
      }
      console.log(data);
    })


  }

  openDialog(): void {
    let dialogRef = this.dialog.open(Popup, {
      width: '550px',
      data: { partos: this.partos, auxM: this.auxM, auxN: this.auxN, formula: this.formula }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  comentar(){
    let comentario = {
      ID_Expediente: this.expID,
      ID_Usuario: sessionStorage.iD,
      Comentario: this.comentario
    }

    console.log(comentario);
    this._comentarioService.newComentario(comentario)
    .subscribe(data => {
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        console.log(data);
        this.mensaje = 'Gracias por su nuevo Comentario';
        document.getElementById('alert').className = 'alert alert-success';
        this.getComentarios();
      }
    }, error => console.log(error))
  }

  borrarComentario(id){
    this._comentarioService.deleteComentario(this.expID, id)
    .subscribe(data => {
      if(data.Codigo == 501){
        console.log(data);
        this.mensaje = 'Comentario borrado';
        document.getElementById('alert').className = 'alert alert-success';
        this.getComentarios();
      }
    }, error => console.log(error))
  }

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
    this.getComentarios();
  }

  cambiarTamPag(tam){
    this.tamPag=tam;
    this.getComentarios();
  }
  mostrarComentarios(id){
    this.coment = 1;
    if(this.publico){
      this.estaCheck = true;
      this.labelPublico = "Expediente p??blico";
    }else{
      this.estaCheck = true;
      this.labelPublico = "Expediente p??blico";
      this.publicar(id);
    }
  }
  publicar(id){
    let body = {
      ID_Publico: id,
      Comentario: 0
    }
    console.log(body);
    this._expedientesService.publicar(body).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        //this.publico = this.expID;
        console.log("Publicar");
      }
    })
  }

  permitirComent(){
    console.log("Comentarios");
    let body = {
      ID_Publico: this.expID,
      Comentario: 1
    }
    if(this.estaComent){
      //si los comentarios est??n activos los desactivo
      this.estaComent = false;
      this._expedientesService.desactivarComentarios(body, this.expID).subscribe(data=>{
        if(data.Codigo == 501){
          //location.href = '/expired';
        }else{
          //this.publico = this.expID;
          console.log(data);
        }
      })
    }else{
      //si no tiene comentarios activos, los activo
      this.estaComent = true;
      this._expedientesService.comentarios(body, this.expID).subscribe(data=>{
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          //this.publico = this.expID;
          console.log(data);
        }
      })
    }
  }


  borrarExpediente(){
    console.log('M??todo para borrar Expediente');
    this.openDialogBorrar();

    // let id = this.expID;
    // this._expedientesService.deleteExpediente(id).subscribe(data=>{
    //   if(data.Codigo == 501){
    //     location.href = '/expired';
    //     return;
    //   }
    //   //Eliminado correctamente
    //   console.log(data);
    // })
  }


  editarExpediente(){
    console.log('Editar Expediente');
    location.href = '/editar-expediente/'+this.expID;
  }
  moverExpediente(){
    console.log('Metodo para mover expediente')
    //Cargar un popUp con un desplegable con las carpetas que tiene el usuario
    this.openDialogMoverExp();
  }
  //Es un metodo para mover los expedientes de las carpetas
  addExpedienteToFolder(idCarpeta){
    console.log('Metodo para a??adir un expediente a una carpeta');
    this._carpetasService.addExpedienteToFolder(this.expID, idCarpeta).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }
      //A??adido correctamente
      console.log(data);
    })
  }

  openDialogBorrar(): void {
    let dialogRef = this.dialog.open(PopupBorrarExp, {
      width: '550px',
      data: { ID_Expediente: this.expID }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      });
  }
  openDialogMoverExp(): void {
    this.movResult = 0;
    let dialogRef = this.dialog.open(popupMoverExp, {
      width: '550px',
      data: { ID_Expediente: this.expID, Carpetas:this.carpetas, Resultado: this.movResult }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pop Up Mover expediente cerrado');
      //this.animal = result;
    });
  }
  openDialogPublicarExp(): void {
    let dialogRef = this.dialog.open(PopupPublicarExp, {
      width: '550px',
      data: { ID_Expediente: this.expID }
    });

    dialogRef.afterClosed().subscribe((publicar: boolean) => {
      //this.animal = result;
      if(publicar){
        this.mostrarComentarios(this.expID);
      }else{
        location.href = "/verexpediente;id="+this.expID;
      }
    });
  }
}
@Component({
  selector: 'popupPublicarExp',
  templateUrl: 'popupPublicarExp.component.html',
})
export class PopupPublicarExp {

  constructor(
    public dialogRef: MatDialogRef<PopupPublicarExp>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _verExpedienteComponent:VerExpedienteComponent) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  mostrarComentarios(){
    // this._verExpedienteComponent.mostrarComentarios(this.data.ID_Expediente);
    // this._verExpedienteComponent.coment =1;
    // this.dialogRef.close();
    this.dialogRef.close(true);
  }
}
@Component({
  selector: 'popupBorrarExp',
  templateUrl: 'popupBorrarExp.component.html',
})
export class PopupBorrarExp {

  constructor(
    public dialogRef: MatDialogRef<PopupBorrarExp>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _expedientesService:ExpedientesService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  borrarExpediente(id){
    this._expedientesService.deleteExpediente(id).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }
      console.log(data);
      location.href ="/misexpedientes";
    })
  }

}
@Component({
  selector: 'popupMoverExp',
  templateUrl: 'popupMoverExp.component.html',
})
export class popupMoverExp {

  constructor(
    public dialogRef: MatDialogRef<popupMoverExp>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _carpetasService:CarpetasService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  pruebaMover(idE, carp){
    console.log('Metodo de confirmar mover Expediente');
    console.log(carp)
    this._carpetasService.addExpedienteToFolder(idE, carp).subscribe(data =>{
      console.log(data);
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }

      this.data.Resultado = 1;
      console.log(this.data.Resultado)
      console.log(data);
    })
  }

}
@Component({
  selector: 'popup',
  templateUrl: 'popup.component.html',
})
export class Popup {

  constructor(
    public dialogRef: MatDialogRef<Popup>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
