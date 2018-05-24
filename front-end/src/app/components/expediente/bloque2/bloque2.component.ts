import { Component, OnInit, Inject } from '@angular/core';
import { ExpedientesService} from '../../../services/expedientes.service';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {ExpedienteComponent} from '../expediente.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { Parto } from '../../../interfaces/parto';

@Component({
  selector: 'app-bloque2',
  templateUrl: './bloque2.component.html',
  styleUrls: []
})



export class Bloque2Component implements OnInit {
  opciones = ["No", 'Si'];
  opciones2 =["A favor", "En contra"];
  numPartos:number = 0;
  formulas = new Array();
  tiposMutilacion = new Array();
  compNacido = new Array();
  compMadre = new Array();
  //Array para almacenar las opciones selecionadas
  compMadreSel = new Array();
  compNacidoSel = new Array();
  partos = new Array(0);
  //totalPartos = new Array(this.numPartos);
  hayParto:boolean = false;
  html:string;
  form:FormGroup;
  mensaje='';

//Prueba de git

//Campos del bloque2
bloque2={
  ID_Bloque:sessionStorage.bloque2,
  ID_Expediente:sessionStorage.IDExp,
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
datosPartos = new Array();

partosCreate = false;

    constructor(private _expedienteService:ExpedientesService,
    private expedienteComponent:ExpedienteComponent, public dialog: MatDialog) {
      console.log('Contructor del bloque 2')
      console.log(sessionStorage);
      console.log(sessionStorage.IDExp)
      console.log(this.bloque2.ID_Expediente);
    this._expedienteService.getFormulasObstreticas().subscribe(data=>{
      console.log('Muestro la data',data);
      this.formulas = data;
    });
    this._expedienteService.getTipoMutilacion().subscribe(data => this.tiposMutilacion = data);
    this._expedienteService.getCompMadre().subscribe(data => this.compMadre = data);
    this._expedienteService.getCompNacido().subscribe(data => this.compNacido = data);
   }



  ngOnInit() {
  }

  guardarDatos2(form){
    console.log(this.bloque2);
    console.log(this.datosPartos);
  }
  // TODO: falta añadoir las complicacioes de la madre y del recien nacido
  guardarDatos(form){
    console.log('Guardo datos');
    this.bloque2.ID_Expediente = sessionStorage.IDExp;
    //Ya tengo todos los datos que hacen falta
    //Pasos => Crear Bloque => crear Parto => Asociar el Parto al bloque2 (de uno en uno)
    //Valido la informacion del formulario
    this._expedienteService.updateBloque2(this.bloque2, this.bloque2.ID_Bloque).subscribe(data=>{
    // this._expedienteService.addBloque2(this.bloque2).subscribe(data=>{
      //Solo realizamos una comprobacion para que todo el proceso de almacenar la información no se quede a mitad
      if(data.Codigo == 501){
        location.href = '/expired';
      }else{
        console.log(data);
        this.bloque2.ID_Bloque = sessionStorage.bloque2;
        let bloque = this.bloque2.ID_Bloque;
        //Ver si existen los partos
        if(this.datosPartos.length >0){
          //Creo los partos
          if(this.partosCreate == false){
            for(let i=0; i<this.datosPartos.length; i++){
              this.datosPartos[i].Id_Bloque= bloque;
              console.log(this.datosPartos[i]);
              this._expedienteService.addParto(this.datosPartos[i]).subscribe(data=>{
                this.partosCreate = true;
                console.log('Muestro la informacion que me devuelve al crear un parto!!!!!!!!!!');
                console.log(data);
                let idParto = data.ID_Parto;
                this.datosPartos[i].ID_Parto = idParto;
                console.log('Muestro el id del parto que acabo de crear');
                console.log(idParto);
                //Una vez creo el parto añado las complicaciones del nacido y del madre que ha selecionado el usuario
                //Miro si ha selecionado alguna complicacion
                if(this.datosPartos[i].CompMadre.length>0){
                  this.getCompMadreSel(i);
                  // TODO: Implementar las funciones del ExpedientesService
                  console.log('Muestro el id del parto que voy a mandar');
                  console.log(idParto);
                  this._expedienteService.addCompMadreParto(idParto, this.compMadreSel).subscribe(data=>{
                    console.log('Info sobre las complicaciones de la madre');
                    console.log(data);
                  });
                }
                //Miro si se ha selecionado alguna complicacion
                if(this.datosPartos[i].compNacido.length>0){
                  this.getCompNacidoSel(i);
                  this._expedienteService.addCompNacidoParto(idParto, this.compNacidoSel).subscribe(data=>{
                    console.log('Info sobre las complicaciones del nacido');
                    console.log(data);
                    //Cambio el bloque
                    //this.cambiarBloque();
                    // this.expedienteComponent.bloque = 3;
                  })
                }
              })
            }
          }else{
            //Actualizo los partos=> Pensar como hacerlo
            console.log('Actualizo los partos')
            this.updatePartos(bloque);
          }
        }
        this.cambiarBloque();
      }
    });
  }

// validarDatos(form){
//   let ok = true;
//   console.log(this.bloque2);
//   console.log(form);
//   console.log('Compruebo manualmente los datos de los partos');
//   let aux = 0;
//   let error = false;
//   if(this.datosPartos.length >=1){
//     for(let i=0; i<this.datosPartos.length && error == false; i++){
//       if(this.datosPartos[i].Fecha ==null || this.datosPartos[i].ID_Formula == null || this.datosPartos[i].ID_Tipo == null ){
//         //No es valido y hay que modificar los partos
//         error = true;
//         }
//     }
//   }else{
//     console.log('no hay partos => no compruebo');
//   }
//   if(form.valid == false){
//     this.mensaje = 'Rellena todos los campos obligatorios';
//     if(error == true){
//       this.mensaje += ' y falta completar datos obligatorios en los partos'
//     }
//     document.getElementById('alert').className = 'alert alert-danger';
//     window.scroll(0, 0);
//     return ok;
//
//   }else{
//     if(error == true){
//       this.mensaje = 'Falta completar la información obligatoria de los partos';
//       document.getElementById('alert').className = 'alert alert-danger';
//       window.scroll(0, 0);
//       return ok
//     }else{
//       console.log('Todo Perfecto');
//       ok = false;
//       return ok;
//     }
//   }
// }

//FUNCION PARA ACTUALIZAR LOS PARTOS
updatePartos(bloque){
  console.log(this.datosPartos);
  for(let i=0; i<this.datosPartos.length; i++){
      this._expedienteService.updateParto(this.datosPartos[i]).subscribe(data=>{
      console.log(data);
      let idParto = this.datosPartos[i].ID_Parto;
      //Una vez creo el parto añado las complicaciones del nacido y del madre que ha selecionado el usuario
      //Miro si ha selecionado alguna complicacion
      if(this.datosPartos[i].CompMadre.length>0){
        this.getCompMadreSel(i);
        this._expedienteService.updateCompMadreParto(idParto, this.compMadreSel).subscribe(data=>{
          console.log('Info sobre las complicaciones de la madre');
          console.log(data);
        });
      }
      //Miro si se ha selecionado alguna complicacion
      if(this.datosPartos[i].compNacido.length>0){
        this.getCompNacidoSel(i);
        this._expedienteService.updateCompNacidoParto(idParto, this.compNacidoSel).subscribe(data=>{
          console.log('Info sobre las complicaciones del nacido');
          console.log(data);
        })
      }
    })
  }
}


//Funcion para obtener las complicaciones de la madre que ha selecionado el usuario
  getCompMadreSel(n){
    this.compMadreSel = new Array();
    for(let i=0; i<this.datosPartos[n].CompMadre.length; i++){
      if(this.datosPartos[n].CompMadre[i] == true){
        this.compMadreSel.push(i+1);
      }
    }
  }

  //Funcion para obtener las complicaciones del recien nacido que seleciona el usuario
  getCompNacidoSel(n){
    this.compNacidoSel = new Array();
    for(let i=0; i<this.datosPartos[n].compNacido.length; i++){
      if(this.datosPartos[n].compNacido[i] == true){
        this.compNacidoSel.push(i+1);
      }
    }
  }
  prueba(n){
    //TODO : REVISAR ESTA FUNCION PARA PODER MODIFICAR LA Info
    // DE LOS PARTOS SIN CREAR MAS
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
      }
    }
}
modificarPartos(){
  console.log('Funcion para modificar los partos');
  this.openDialog2(this.datosPartos.length);
}
cambiarBloque(){
   console.log('Cambio de bloque');
   this.expedienteComponent.selectedTab = 2;
  //  this.expedienteComponent.bloquearPestanya(2);
  //  this.expedienteComponent.desbloquearPestaña(3);
}
terminar(){
  //Borro todos los campos auxiliares que tiene el formulario de expedientes
  sessionStorage.removeItem('IDExp');
  sessionStorage.removeItem('IDPer');
  sessionStorage.removeItem('bloque1');
  sessionStorage.removeItem('bloque2');
  sessionStorage.removeItem('bloque3');
  sessionStorage.removeItem('bloque4');
  sessionStorage.removeItem('bloque5');
  location.href = '/home';
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
          this.datosPartos.push(new Parto);
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
    let dialogRef = this.dialog.open(Popup2, {
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
  let dialogRef = this.dialog.open(Popup2, {
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
@Component({
  selector: 'popup',
  templateUrl: 'popup.component.html',

})
export class Popup2 {
  hayAlgo:boolean = false;
  variableka:number = 17;

  constructor(
    public dialogRef: MatDialogRef<Popup2>,
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


   constructor(){
     this.CompMadre = new Array();
     this.compNacido = new Array();
   }


 }
