import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedientesService} from '../../../services/expedientes.service';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
  hayParto:boolean = false;

  //Variables para guaradr las consecuencias que tiene el Parto cuando viene de LA BD
  consecMadreDB = new Array();
  consecNacidoDB = new Array();

  partos = new Array(0);
  datosPartos = new Array();
  numPartos:number = 0;

  constructor(private _expedienteService:ExpedientesService,public dialog: MatDialog, private activatedRoute: ActivatedRoute) {
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
      // if(this.bloque2.Otros == "''"){
      //   this.bloque2.Otros = ''
      // }else{
      //   this.bloque2.Otros = this.bloque2.Otros.split("''")[1];
      // }
      // if(this.bloque2.Significado_MGF == "''"){
      //   this.bloque2.Significado_MGF ='';
      // }else{
      //   this.bloque2.Significado_MGF = this.bloque2.Significado_MGF.split("''")[1];
      // }
      this.numPartos = this.bloque2.Num_Partos;
      //Recuepro los partos del bloque 2
      this._expedienteService.getPartos(this.id).subscribe(data=>{
        console.log('Muestro los partos que devuelve la API')
        console.log(data);
        this.datosPartos = data;
        console.log(data[0]);
        //Obtengo las consecuencias de cada parto
        for(let i = 0; i<data.length; i++){
          this._expedienteService.getConsecM(data[i].ID_Parto).subscribe(data=>{
            console.log(data);
            this.consecMadreDB.push(data);
            console.log(this.consecMadreDB);
          });
          this.datosPartos[i].CompMadre = this.compMadre;

          this._expedienteService.getConsecN(data[i].ID_Parto).subscribe(data=>{
            this.consecNacidoDB.push(data);
          })
          this.datosPartos[i].compNacidoSel = new Array();
          // this.datosPartos[i].compNacidoSel[0]=true;
          // this.datosPartos[i].compNacidoSel[3]=false;
          this.datosPartos[i].compNacido = this.compNacido;
          this.datosPartos[0].compNacido[0].Checked = 1;
        };

        console.log('Muestro las consecuencias que tienen los partos ');
        console.log(this.consecMadreDB);
        console.log(this.consecNacidoDB);


      })
      //TODO: Necesito un FromControl para poder Marcar los valores de SI/NO/NS en el formulario
    })
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
    //  console.log('Muestro el formControl');
    //  console.log(this.form);
     //Actualizo los valores de SI/NO en el json que voy a mandar a la API
     this.bloque2.Conoce_MGF = this.form.value.Conoce_MGF;
     this.bloque2.MGF_realizada_com_origen = this.form.value.MGF_realizada_com_origen;
     this.bloque2.Pos_padre = this.form.value.Pos_padre;
     this.bloque2.Pos_madre = this.form.value.Pos_madre;
     this.bloque2.Pos_familia = this.form.value.Pos_familia;
     console.log('Muestro el bloque actualizado');
     console.log(this.bloque2);
    //  this.marcarConsecuencias();
    this._expedienteService.updateBloque2(this.bloque2, this.bloque2.ID_Bloque).subscribe(data=>{
      console.log(data);
    })
   }

   // TODO: Falta hacer un metodo auxiliar para marcar las consecuencias que tiene cada parto
   /** para que salgan marcadas en el popUp, para ello cada parto va a tener un array con
   todas las consecuencias y vamos a hacer la misma tecnica que en el bloque 4.
   añadir un campo cheked para luego poder marcalo */

   marcarConsecuencias(){
     console.log('Metodo axiliar para marcar todas las consecuencias que tengan ya almacenadas los partos');
     console.log(this.datosPartos);
     console.log('Complicaciones que sufre la madre');
     console.log(this.consecMadreDB);
     console.log(this.consecMadreDB[1]);
     console.log(this.consecMadreDB.indexOf(0));
     console.log('Complicaciones que sufre el recien nacido');
     console.log(this.consecNacidoDB);
     console.log(this.consecNacidoDB.length);
     console.log('Muestro todas las consecuencias posibles')
     console.log('Para la madre');
     console.log(this.compMadre);
     console.log('Para el recien nacido');
     console.log(this.compNacido);

    //  Modifico el array de complicaciones que tiene cada partos
    //Marco las complicaciones de la madre
    for(let i = 0; i<this.datosPartos.length; i++){
      let  aux = this.datosPartos[i].CompMadre;
          console.log('Todas las CPMadre de 1 parto');
          console.log(aux);
          //Recorro las selecionadas para buscar
          for(let j = 0; j<this.consecMadreDB[i].length; j++){
            let encontrada = false;
            console.log('Muestro las complicaciones de la BD');
            console.log(this.consecMadreDB[i][j])
            //La busco en el array de todas del parto
            for(let k=0; k<aux.length && encontrada == false; k++){
              if(this.consecMadreDB[i][j].ID_Complicacion == aux[k].ID_Complicacion){
                this.datosPartos[i].CompMadre[k].Checked = 1
                encontrada = true;
              }
            }
          }
      }
      //Marco las complicaciones del recien nacido
      for(let i=0; i<this.datosPartos.length; i++){
        let aux = this.datosPartos[i].compNacido;
        console.log(aux);
        for(let j = 0; j<this.consecNacidoDB[i].length; j++){
          let encontrada = false;
          for(let k = 0; k<aux.length && encontrada == false; k++){
            if(this.consecNacidoDB[i][j].ID_Complicacion == aux[k].ID_Complicacion){
              encontrada = true;
              console.log(this.datosPartos[i]);
              this.datosPartos[i].compNacido[k].Checked =1;
              this.datosPartos[i].compNacidoSel = true;
            }
          }
        }
      }

    console.log('Muestro los partos despues de marcar sus complicaciones');
    console.log(this.datosPartos);
    // this.datosPartos[0].CompMadre[0].Checked =1;
    // this.datosPartos[1].CompMadre[1].Checked =1;
    console.log(this.datosPartos[0]);
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
      if(nPartos != ''){
        if(this.datosPartos.length >= 1){
          console.log('Aqui tengo que modificar el tamaño si borrar datos');
          console.log(nPartos);
          console.log(this.datosPartos.length);
          let aux = nPartos-this.datosPartos.length;
          console.log(aux);
          if(aux > 0){
            //Anyado partos
            for(let i = 0; i<aux; i++){
              // this.datosPartos.push(new Parto);
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
     compNacido:number[];
     compNacidoSel:number[];

     constructor(){
       this.CompMadre = new Array();
       this.compNacido = new Array();
       this.compNacidoSel = new Array();
     }
   }
