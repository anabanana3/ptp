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

  constructor(
    private _expedientesService:ExpedientesService, private router:ActivatedRoute,
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
        console.log(data);
        this.expediente = data;
        this.idPersona = data[0].ID_Persona;
        this._expedientesService.getPersonaById(this.idPersona).subscribe(data=>{
          this.persona = data;
          //console.log(data);
        })
        //familiares de la persona
        this._expedientesService.getFamiliarPersona(this.idPersona).subscribe(data=>{
          for(let i = 0; i< data.length; i++){
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
    this.bloque1 = data;
    console.log(data);
    if(data.length > 0){
      this.curso = data[0].Curso.split("'")[1];
      //console.log("curso:"+ data[0].Curso.split("'")[1]);
      this.centro_Salud = data[0].Centro_Salud.split("'")[1];
    }
    })
    //obtenemos datos b2
    this._expedientesService.getBloque2(this.expID).subscribe(data=>{
      this.bloque2 = data;
      if(data.lenght > 0){
        this.b2Otros = data[0].Otros.split("'")[1];
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
      this.bloque3 = data;
      //console.log('b3: '+this.bloque3);
    })
    this._expedientesService.getBloque4(this.expID).subscribe(data=>{
      this.bloque4 = data;
    })
    this._expedientesService.getBloque5(this.expID).subscribe(data=>{
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
        this.mostrarComentarios();
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
  mostrarComentarios(){
    this.coment = 1;
    if(this.publico){
      this.estaCheck = true;
      this.labelPublico = "Expediente público";
    }else{
      this.estaCheck = true;
      this.labelPublico = "Expediente público";
      this.publicar();
    }
  }
  publicar(){
    let body = {
      ID_Publico: this.expID,
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
      //si los comentarios están activos los desactivo
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
    console.log('Método para borrar Expediente');
    let id = this.expID;
    this._expedientesService.deleteExpediente(id).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }
      //Eliminado correctamente
      console.log(data);
    })
  }

  //Es un metodo para mover los expedientes de las carpetas
  addExpedienteToFolder(idCarpeta){
    console.log('Metodo para añadir un expediente a una carpeta');
    this._carpetasService.addExpedienteToFolder(this.expID, idCarpeta).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }
      //Añadido correctamente
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
