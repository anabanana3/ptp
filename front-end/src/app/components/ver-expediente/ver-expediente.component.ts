import { Component, OnInit, Inject } from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';
import { ComentarioService } from '../../services/comentario.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-ver-expediente',
  templateUrl: './ver-expediente.component.html',
  styleUrls: ['./ver-expediente.component.css']
})
export class VerExpedienteComponent implements OnInit {

  expID:number;
  expediente = new Array();
  bloque1 = new Array();
  bloque2 = new Array();
  curso:string;
  centro_Salud:string;
  b2Otros:string;
  partos = new Array();
  //nombreCM:{}[];
  nombreCM = new Array();
  nombreCN = new Array();
  auxM = new Array();
  auxN = new Array();

  //comentarios
  comentario:string = '';
  tamPag = 10;
  mensaje:string = '';

  constructor(
    private _expedientesService:ExpedientesService, private router:ActivatedRoute,
    public dialog: MatDialog, private _comentarioService:ComentarioService) {
      _comentarioService.getComentariosByExpediente(this.router.snapshot.params['id'], 1, this.tamPag)
      .subscribe(data => {
        console.log(data);
      })
  }

  ngOnInit() {
    //obtenemos el id del exp que queremos ver
    this.expID = this.router.snapshot.params['id'];
    console.log(this.expID);
    this._expedientesService.getExpedienteById(this.expID).subscribe(data=>{
      this.expediente = data;
      console.log('datos: '+this.expediente);
    })
    this._expedientesService.getBloque1(this.expID).subscribe(data=>{
      this.bloque1 = data;
      this.curso = data[0].Curso.split("'")[1];
      //console.log("curso:"+ data[0].Curso.split("'")[1]);
      this.centro_Salud = data[0].Centro_Salud.split("'")[1];
      console.log('b1: '+this.bloque1);
    })
    this._expedientesService.getBloque2(this.expID).subscribe(data=>{
      this.bloque2 = data;
      this.b2Otros = data[0].Otros.split("'")[1];
      console.log('b2: '+this.bloque2+"id exp"+this.expID);
    })
    this._expedientesService.getPartos(this.expID).subscribe(data=>{
      this.partos = data;
      //this.b2Otros = data[0].Otros.split("'")[1];
      console.log('partos: '+this.partos);
      for(let i =0; i< this.partos.length; i++){
        console.log('partosID: '+this.partos[i].ID_Parto);
        this._expedientesService.getConsecM(this.partos[i].ID_Parto).subscribe(dataM=>{
          //recorremos dataM
          for(let j = 0; j<dataM.length; j++){
            //this.complicM.push(dataM[j].COMPLICACIONES_MADRE_ID_Complicacion);
            this._expedientesService.getComplicMadreById(dataM[j].COMPLICACIONES_MADRE_ID_Complicacion).subscribe(dataM=>{
              this.nombreCM.push(dataM[0].Nombre);
              //console.log(dataM[0].Nombre);
            })
          }
          this.auxM.push(this.nombreCM);
        })
        this._expedientesService.getConsecN(this.partos[i].ID_Parto).subscribe(dataN=>{
          //console.log('complicN: '+dataN);
          for(let j = 0; j<dataN.length; j++){
            //this.complicN.push(dataN[j].ID_Complicacion);
            this._expedientesService.getComplicNacidoById(dataN[j].ID_Complicacion).subscribe(dataN=>{
              this.nombreCN.push(dataN[0].Nombre);
              //console.log(dataN[0].Nombre);
            })
          }
          this.auxN.push(this.nombreCN);
          console.log(this.auxN);
        })
      }
    })
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(Popup, {
      width: '550px',
      data: { partos: this.partos, auxM: this.auxM, auxN: this.auxN }
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
      console.log(data);
      this.mensaje = 'Gracias por su nuevo Comentario';
      document.getElementById('alert').className = 'alert alert-success';
    }, error => console.log(error))
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
