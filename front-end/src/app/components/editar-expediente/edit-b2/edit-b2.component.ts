import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedientesService} from '../../../services/expedientes.service';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EditarExpedienteComponent } from '../editar-expediente.component';

@Component({
  selector: 'app-edit-b2',
  templateUrl: './edit-b2.component.html'

})
export class EditB2Component implements OnInit {

  id:number;
  bloque2={
    ID_Bloque:null,
    Conoce_MGF:2,
    MGF_realizada_com_origen:2,
    Pos_madre:2,
    Pos_padre:2,
    Pos_familia:2,
    Otros:'',
    Significado_MGF:'',
    Formato_intervencion:'',
    Consejos:'',
    Sintomas_MGF:'',
    Num_Partos:0,
  }

  formulas = new Array();
  tiposMutilacion = new Array();
  compMadre = new Array();
  compNacido = new Array();
  compMadreSel = new Array();
  compNacidoSel = new Array();
  form: FormGroup;
  //Variable de contro para el HTML
  hayParto:boolean = false;

  partos = new Array(0);
  datosPartos = new Array();
  numPartos:number = 0;

  constructor(private _expedienteService:ExpedientesService,public dialog: MatDialog, private activatedRoute: ActivatedRoute, private _EditarExpedienteComponent:EditarExpedienteComponent) {
    console.log('Contructor');
    //Recupero la informacion => para los desplegables
    this._expedienteService.getFormulasObstreticas().subscribe(data=>this.formulas = data);
    this._expedienteService.getTipoMutilacion().subscribe(data=> this.tiposMutilacion = data);
    this._expedienteService.getCompMadre().subscribe(data => this.compMadre = data);
    this._expedienteService.getCompNacido().subscribe(data => this.compNacido = data);

    //Recupero la informacion del bloque 2
    activatedRoute.params.subscribe(params=>{
      this.id = params['id'];
    });
    this._expedienteService.getBloque2(this.id).subscribe(data=>{
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }
      console.log('Bloque 2');
      console.log(data);
      this.bloque2 = data[0];
      console.log(this.bloque2);
      this.bloque2.Sintomas_MGF ='';
      //Limpio las comillas que me devuelve la BD
      if(this.bloque2.Consejos =="''"){
        this.bloque2.Consejos = ''
      }else{
        console.log(this.bloque2.Consejos);
        this.bloque2.Consejos = this.bloque2.Consejos.split("'")[1];
      }
      if(this.bloque2.Formato_intervencion == "''"){
        this.bloque2.Formato_intervencion='';
      }else{
        this.bloque2.Formato_intervencion = this.bloque2.Formato_intervencion.split("'")[1];
      }
      if(this.bloque2.Otros == "''"){
        this.bloque2.Otros = ''
      }else{
        this.bloque2.Otros = this.bloque2.Otros.split("'")[1];
      }
      if(this.bloque2.Significado_MGF == "''"){
        this.bloque2.Significado_MGF ='';
      }else{
        this.bloque2.Significado_MGF = this.bloque2.Significado_MGF.split("'")[1];
      }
      this.numPartos = this.bloque2.Num_Partos;
      //Recuepro los partos del bloque 2
      this._expedienteService.getPartos(this.id).subscribe(data=>{
        this.datosPartos = data;
        //Obtengo las consecuencias de cada parto
        for(let i = 0; i<data.length; i++){
          //Limpio el formato de la fecha de cada parto
          if(data[i].Fecha != null){
            data[i].Fecha = data[i].Fecha.split('T')[0];
          }
          //Obtengo las complicaciones del nacido de un parto y las marco
          this._expedienteService.getConsecN(data[i].ID_Parto).subscribe(data=>{
            //Arrays de control que tiene cada parto
            this.datosPartos[i].compNacidoBD = data;
            this.datosPartos[i].compNacido = this.compNacido;
            this.datosPartos[i].compNacidoSel = new Array();
              this.marcarConsecNacido(this.datosPartos[i],i);
          });
          //Obtengo las complicaciones de la madre de un parto y las marco
          this._expedienteService.getConsecM(data[i].ID_Parto).subscribe(data=>{
            //Variables de control que tiene cada parto
            this.datosPartos[i].compMadreBD = data;
            this.datosPartos[i].CompMadre = this.compMadre;
            this.datosPartos[i].compMadreSel = new Array();
            this.marcarConsecMadre(this.datosPartos[i],i);
          })
        };
      })
      //TODO: Necesito un FromControl para poder Marcar los valores de SI/NO/NS en el formulario
    })
    // Necesito un FromControl para poder Marcar los valores de SI/NO/NS en el formulario
    this.form = new FormGroup({
      "Conoce_MGF": new FormControl(this.bloque2.Conoce_MGF),
      "MGF_realizada_com_origen": new FormControl(this.bloque2.MGF_realizada_com_origen),
      "Pos_padre": new FormControl(this.bloque2.Pos_padre),
      "Pos_madre": new FormControl(this.bloque2.Pos_madre),
      "Pos_familia": new FormControl(this.bloque2.Pos_familia),
    })
   }

  ngOnInit() {

  }



  guardarDatos(forma){
    console.log('Metodo para actualizar la informacion en la BD');
    console.log('Muestro el estado del bloque');
    console.log(this.bloque2);
    //Actualizo los valores de SI/NO en el json que voy a mandar a la API
    this.bloque2.Conoce_MGF = this.form.value.Conoce_MGF;
    this.bloque2.MGF_realizada_com_origen = this.form.value.MGF_realizada_com_origen;
    this.bloque2.Pos_padre = this.form.value.Pos_padre;
    this.bloque2.Pos_madre = this.form.value.Pos_madre;
    this.bloque2.Pos_familia = this.form.value.Pos_familia;
    console.log('Muestro el bloque actualizado');
    console.log(this.bloque2);
    // TODO: Falta terminar de seleccionar las consecuencias de la BB
    //y revisar que va actualizar PArtos tanto aqui como en formulario de crear un parto
    //  this.marcarConsecuencias();
    this._expedienteService.updateBloque2(this.bloque2, this.bloque2.ID_Bloque).subscribe(data=>{
      console.log(data);
      if(data.Codigo == 501){
        location.href = '/expired';
        return;
      }
      //Actualizo los partos
      if(this.datosPartos.length > 0){
        for(let i = 0; i<this.datosPartos.length; i++){
          //Si tiene ID_Parto => ya esta creado lo actualizo
          if(this.datosPartos[i].ID_Parto != null){
            this._expedienteService.updateParto(this.datosPartos[i]).subscribe(data=>{
              console.log(data);
              //Actualizo las complicaciones delparto => ver si es necesario con un if
              this.getCompMadreSend(i);
              this._expedienteService.updateCompMadreParto(this.datosPartos[i].ID_Parto, this.datosPartos[i].compMadreSend).subscribe(data=>{
                console.log(data);
              });
              this.getCompNacidoSend(i);
              this._expedienteService.updateCompNacidoParto(this.datosPartos[i].ID_Parto, this.datosPartos[i].compNacidoSend).subscribe(data=>{
                console.log(data);
                this.cambiarBloque()
              })
            })
          }else{
            //No tiene ID_Parto => lo creo
            console.log(this.bloque2.ID_Bloque);
            this.datosPartos[i].Id_Bloque =this.bloque2.ID_Bloque;
            this.datosPartos[i].ID_Expediente = this.id;
            console.log(this.datosPartos[i].ID_Bloque);
            this._expedienteService.addParto(this.datosPartos[i]).subscribe(data=>{
              this.datosPartos[i].ID_Parto = data.ID_Parto;
              let idParto = data.ID_Parto;
              //Creo las complicaciones de la madre
              this.getCompMadreSend(i);
              this._expedienteService.addCompMadreParto(idParto,this.datosPartos[i].compMadreSend).subscribe(data=>{
                console.log(data);
              })
              //Creo las complicaciones del recien nacido
              this.getCompNacidoSend(i);
              this._expedienteService.addCompNacidoParto(idParto, this.datosPartos[i].compNacidoSend).subscribe(data=>{
                console.log(data);
                this.cambiarBloque();
              })
            })
          }
        }
      }
      this.cambiarBloque();
    })
   }


   marcarConsecNacido(p,pos){
     console.log('Metodo para marcar las complicaciones del recien nacido asociadas a un parto')
     //Marco las complicaciones del recien nacido
     for(let i = 0; i<this.datosPartos[pos].compNacido.length; i++){
       let encontrada = false;
       for(let j = 0; j<this.datosPartos[pos].compNacidoBD.length && encontrada == false; j++){
         if(p.compNacido[i].ID_Complicacion == p.compNacidoBD[j].ID_Complicacion){
           this.datosPartos[pos].compNacidoSel[i] = true;
           this.datosPartos[pos].compNacido[i].Checked = 1;
           encontrada = true;
         }
       }
     }
     console.log('Muestro los partos despues de marcar las consecNAcido');
     console.log(this.datosPartos);
   }
   marcarConsecMadre(p,pos){
     console.log('Metodo para marcar las consecuencias que sufre la madre durante el parto');
     //Marco las complicaciones de la madre
     console.log(this.datosPartos[pos].CompMadre);
     for(let i = 0; i<this.datosPartos[pos].CompMadre.length; i++){
       let encontrada = false;
       for(let j = 0; j<this.datosPartos[pos].compMadreBD.length && encontrada == false; j++){
         if(p.CompMadre[i].ID_Complicacion == p.compMadreBD[j].ID_Complicacion){
          this.datosPartos[pos].compMadreSel[i] = true;
          this.datosPartos[pos].CompMadre[i].Checked = 1;
         }
       }
     }
     console.log('Muestro los partos despues de marcar las consecMadre');
     console.log(this.datosPartos);
   }

   getCompMadreSend(pos){
     this.datosPartos[pos].compMadreSend = new Array();
     for(let i=0; i<this.datosPartos[pos].compMadreSel.length; i++){
       if(this.datosPartos[pos].compMadreSel[i] == true){
         this.datosPartos[pos].compMadreSend.push(i+1);
       }
     }
     //Añado las que ya estaban marcadas => ese cambio no se detecta
     for(let i=0;i < this.datosPartos[pos].compMadreBD; i++){
       this.datosPartos[pos].compMadreSend.push(this.datosPartos[pos].compMadreBD[i].ID_Complicacion);
     }
     console.log('Muestro las complicaciones que voy a mandar a la API');
     console.log(this.datosPartos[pos].compMadreSend);


   }
   getCompNacidoSend(pos){
     this.datosPartos[pos].compNacidoSend = new Array();
     for(let i=0; i<this.datosPartos[pos].compNacidoSel.length; i++){
       if(this.datosPartos[pos].compNacidoSel[i] == true){
         this.datosPartos[pos].compNacidoSend.push(i+1);
       }
     }
     //Añado las que ya estaban marcadas => ese cambio no se detecta
     for(let i=0;i < this.datosPartos[pos].compNacidoBD; i++){
       this.datosPartos[pos].compNacidoSend.push(this.datosPartos[pos].compNacidoBD[i].ID_Complicacion);
     }
     console.log('Muestro las complicaciones que voy a mandar a la API');
     console.log(this.datosPartos[pos].compNacidoSend);
   }

   prueba(n){
    if(n>0){
      this.datosPartos = new Array();
      console.log('Funcion de prueba de ocntenido');
      console.log(this.numPartos);
      this.bloque2.Num_Partos = n;
      this.partos = new Array(n);
      for(let i=0; i<n-1; i++){
        this.partos.push(i);
      }
      //Prueba de inicializar el array de partos
      for(let i=0; i<n; i++){
        this.datosPartos.push(new Parto());
        //Asigno todas las consecuencias sin marcarlas
        this.datosPartos[i].CompMadre = this.compMadre;
        this.datosPartos[i].compNacido = this.compNacido;
      }
    }
  }

  openDialog(nPartos): void {
      console.log(nPartos);
      this.bloque2.Num_Partos = nPartos;
      if(nPartos != ''){
        if(this.datosPartos.length >= 1){
          console.log('Aqui tengo que modificar el tamaño si borrar datos');
          console.log(nPartos);
          console.log(this.datosPartos.length);
          let aux = nPartos - this.datosPartos.length;
          console.log(aux);
          if(aux > 0){
            //Anyado partos
            for(let i = 0; i<aux; i++){
              //Le asigno todas las complicaciones para mostrarlas
              let p = new Parto;
              p.CompMadre = this.compMadre;
              p.compNacido = this.compNacido
              this.datosPartos.push(p);
            }

          }else{
            //Borro partos
            aux = -aux;
            for(let i = 0; i<aux && i<=this.datosPartos.length; i++){
              this.datosPartos.pop();
            }
          }
          console.log(this.datosPartos);
        }else{
          this.prueba(nPartos);
          console.log(this.datosPartos);
        }
        let dialogRef = this.dialog.open(PopupEditB2, {
          width: '1000px',
          //data: { partos: this.partos, auxM: this.auxM, auxN: this.auxN }
          data:{Npartos: nPartos, pagina: 0, datosPartos: this.datosPartos, compNacido: this.compNacido, compMadre: this.compMadre, formulas: this.formulas, tiposMutilacion: this.tiposMutilacion}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(this.datosPartos);
          //this.animal = result;
        });
      }
    }

    openDialog2(nPartos): void {
      console.log(nPartos);
      console.log(this.datosPartos);
      let dialogRef = this.dialog.open(PopupEditB2, {
        width: '1000px',
        //data: { partos: this.partos, auxM: this.auxM, auxN: this.auxN }
        data:{Npartos: nPartos, pagina: 0, datosPartos: this.datosPartos, compNacido: this.compNacido, compMadre: this.compMadre, formulas: this.formulas, tiposMutilacion: this.tiposMutilacion}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(this.datosPartos);
        //this.animal = result;
      });
    }

    modificarPartos(){
      console.log('Funcion para modificar los partos');
      this.openDialog2(this.datosPartos.length);
    }

    cambiarBloque(){
       console.log('Cambio de bloque');
       this._EditarExpedienteComponent.selectedTab = 2;
    }
    terminar(){
      location.href="/verexpediente;id="+this.id;
    }

  }

  @Component({
    selector: 'popup',
    templateUrl: 'popup.component.html',

  })
  export class PopupEditB2 {
    hayAlgo:boolean = false;
    variableka:number = 17;

    constructor(
      public dialogRef: MatDialogRef<PopupEditB2>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();

    }

    aumentarVar(){
      console.log("entro en aumentarVar()");
      console.log("variableka: "+ this.variableka);
      this.variableka = this.variableka + 1;
      console.log("ahora variableka: " + this.variableka);
    }

    mostrarPartoMadre(){
      console.log("mostrarPartoMadre");
      document.getElementById("iconPlus").style.display="none";
      document.getElementById("iconMinus").style.display="block";
      document.getElementById("complMadreContainer").style.display="block";
    }

    ocultarPartoMadre(){
      console.log("ocultarPartoMadre");
      document.getElementById("iconMinus").style.display="none";
      document.getElementById("iconPlus").style.display="block";
      document.getElementById("complMadreContainer").style.display="none";
    }

    mostrarNinio(){
      console.log("mostrarPartoMadre");
      document.getElementById("iconPlusN").style.display="none";
      document.getElementById("iconMinusN").style.display="block";
      document.getElementById("complNinioContainer").style.display="block";
    }

    ocultarNinio(){
      console.log("ocultarPartoMadre");
      document.getElementById("iconMinusN").style.display="none";
      document.getElementById("iconPlusN").style.display="block";
      document.getElementById("complNinioContainer").style.display="none";
    }

    calculaEdad(e, fecha){
      console.log(fecha.value);
      console.log(fecha.value.split('-')[0]);
      let yearSelec = fecha.value.split('-')[0];
      let aux = new Date();
      let year = aux.getFullYear();
      console.log(year - yearSelec);
      let edad = year - yearSelec;
      console.log(this.data)

    }
  }
  //
  class Parto{
    ID_Parto = null;
    ID_Expediente:number=sessionStorage.IDExp;
    Id_Bloque:number;
    Edad_Madre:number=0;
    Fecha:Date=null;
    Edad_Nacido:number=0;
    Tiempo_Expulsivo:number=0;
    Tiempo_Dilatacion:number=0;
    Duracion_Parto:number=0;
    ID_Formula:number = 6;
    Test_APGAR:number=0;
    ID_Tipo:number=1;
    ID_Mutilacion:number= 5;
    CompMadre:number[];
    compMadreSel:number[];
    compMadreBD:number[];
    compMadreSend:number[];
    compNacido:number[];
    compNacidoBD:number[];
    compNacidoSel:number[];
    compNacidoSend:number[];

     constructor(){
       this.CompMadre = new Array();
       this.compNacido = new Array();
       this.compNacidoSel = new Array();
       this.compNacidoBD = new Array();
       this.compMadreSel= new Array();
       this.compMadreBD = new Array();
       this.compMadreSend = new Array();
       this.compNacidoSend = new Array();
     }
   }
