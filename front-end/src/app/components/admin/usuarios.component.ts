import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../interfaces/user.interface";
//Para las rutas
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent {

  user:User ={
    Nombre:'',
    Apellidos: '',
    F_Nacimiento: '',
    Email: '',
    Asociacion: '',
    Profesion: '',
    ID_Lugar: '',
    Direccion: '',
    Sexo: '',
    DNI: ''
  };

  resultado:any;
  usuarios:User[];

  //Para la paginacion
  paginas= new Array(3);
  pagNext;
  pagBack;
  pagActual;
  tamPag:number = 3;

  loading:boolean = true;

  tabla:number = 0;
  /* tabla
    0: Solicitantes
    1: Registrados
    2: Cancelados
  */

  mensaje:string = '';
  error:boolean = true;
  constructor(private _userService:UserService, private activatedRoute:ActivatedRoute){
    if(sessionStorage.getItem('iD') !== '44'){
      return;
    }
    this.error = false;
    this._userService.getSolicitantes(1,this.tamPag).subscribe(data=>{
      this.loading = false;
      //this.user = data.Data;
      this.resultado = data;
      this.usuarios= this.resultado.Data;
      this.pagActual = this.resultado.Pagina;
      this.paginacion(this.resultado.Pagina, this.resultado.Paginas_Totales);
      this.tamPag = this.resultado.Elementos_Pagina;

      console.log(data);
    })
    return;
  }

  cancelUser(id){
    this._userService.deleteUsuario(id).subscribe(res => {
      if(res.warningCount == 0){
        this.mensaje = 'Usuario Cancelado!';
        location.href = '/admin/usuarios#arriba';
        document.getElementById('alert').className = 'alert alert-success';
        delete this.user[id];
        this.loading = true;
        this._userService.getSolicitantes(1, this.tamPag).subscribe(data=>{
          this.loading = false;
          this.user = data.Data;
        })
      }
      else{
        this.mensaje = 'Ha ocurrido un error!';
        location.href = '/admin/usuarios#arriba';
        document.getElementById('alert').className = 'alert alert-danger';
      }
    })
  }

//Funcion con parametro por defecto => si recibe uno diferente lo cambia
  view(number, pagina=1, tam=3){
    if(number == 0){
      this._userService.getSolicitantes(pagina, tam).subscribe(data=>{
        this.loading = false;
        console.log('Solicitantes');
        this.tabla = 0
        console.log(data);
        this.resultado = data;
        this.usuarios= this.resultado.Data;
        console.log("Muestro la varibale resultado", this.resultado);
        console.log("Muestro los usuario a mostrar", this.usuarios);
        this.pagActual = this.resultado.Pagina;
        this.paginacion(this.resultado.Pagina, this.resultado.Paginas_Totales);
      })
      return;
    }

    if(number == 1){
      this._userService.getRegistrados(pagina, tam).subscribe(data=>{
        this.loading = false;
        this.tabla = 1
        console.log('Registrados');
        console.log(data);
        //console.log(data.Data);
        //this.user = data;
        this.resultado = data;
        this.usuarios= this.resultado.Data;
        console.log("Muestro la varibale resultado", this.resultado);
        console.log("Muestro los usuario a mostrar", this.usuarios);
        //console.log(this.user);
        this.pagActual = this.resultado.Pagina;
        this.paginacion(this.resultado.Pagina, this.resultado.Paginas_Totales);
        console.log("Muestro el tamaño pagina en la funcion de mostrar usuarios", this.tamPag);
      })
      return;
    }

    if(number == 2){
      this._userService.getCancelados(pagina, tam ).subscribe(data=>{
        this.loading = false;
        this.tabla = 2
        console.log('Cancelados');
        this.resultado = data;
        this.usuarios= this.resultado.Data;
        this.pagActual = this.resultado.Pagina;
        console.log("Muestro la varibale resultado", this.resultado);
        console.log("Muestro los usuario a mostrar", this.usuarios);
        //console.log(data);
        //this.user = data;
        //console.log("Muestro la varibale user");
        //console.log(this.user);
        this.paginacion(this.resultado.Pagina, this.resultado.Paginas_Totales);
      })
      return;
    }
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
    console.log("Total de paginas", this.paginas.length);
    console.log('PAgina Actual', paginaActual);
    console.log("Pagina Siguiente", this.pagNext);
    console.log("Pagina anterior", this.pagBack);
  }

  pasarPagina(pag){
    console.log(pag);
    console.log('Muestro el numero ese de andrea', this.tabla);
    this.view(this.tabla, pag, this.tamPag);
    this.pagActual = pag;
  }

  cambiarTamPag(tam){
    console.log(tam);
    this.tamPag=tam;
    this.view(this.tabla, 1, this.tamPag);;
  }
}



// import { Component } from '@angular/core';
// import { UserService } from "../../services/user.service";
// import { User } from "../../interfaces/user.interface";
//
// @Component({
//   selector: 'app-usuarios',
//   templateUrl: './usuarios.component.html'
// })
// export class UsuariosComponent {
//
//   user:User ={
//     Nombre:'',
//     Apellidos: '',
//     F_Nacimiento: '',
//     Email: '',
//     Asociacion: '',
//     Profesion: '',
//     ID_Lugar: '',
//     Direccion: '',
//     Sexo: '',
//     DNI: ''
//   };
//
//   loading:boolean = true;
//
//   tabla:number = 0;
//   /* tabla
//     0: Solicitantes
//     1: Registrados
//     2: Cancelados
//   */
//
//   mensaje:string = '';
//   error:boolean = true;
//   constructor(private _userService:UserService){
//     if(sessionStorage.getItem('iD') !== '44'){
//       return;
//     }
//     this.error = false;
//
//     this._userService.getSolicitantes(1, 3).subscribe(data=>{
//       this.loading = false;
//       this.user = data.Data;
//
//       console.log(data);
//     })
//     return;
//   }
//
//   cancelUser(id){
//     this._userService.deleteUsuario(id).subscribe(res => {
//       if(res.warningCount == 0){
//         this.mensaje = 'Usuario Cancelado!';
//         location.href = '/admin/usuarios#arriba';
//         document.getElementById('alert').className = 'alert alert-success';
//         delete this.user[id];
//         this.loading = true;
//         this._userService.getSolicitantes(1, 3).subscribe(data=>{
//           this.loading = false;
//           this.user = data.Data;
//         })
//       }
//       else{
//         this.mensaje = 'Ha ocurrido un error!';
//         location.href = '/admin/usuarios#arriba';
//         document.getElementById('alert').className = 'alert alert-danger';
//       }
//     })
//   }
//
//   view(number){
//     if(number == 0){
//       this._userService.getSolicitantes(1, 3).subscribe(data=>{
//         this.loading = false;
//         console.log('Solicitantes');
//         this.tabla = 0
//         console.log(data);
//         this.user = data.Data;
//       })
//       return;
//     }
//
//     if(number == 1){
//       this._userService.getRegistrados(1, 3).subscribe(data=>{
//         this.loading = false;
//         this.tabla = 1
//         console.log('Registrados');
//         console.log(data.Data);
//         this.user = data.Data;
//       })
//       return;
//     }
//
//     if(number == 2){
//       this._userService.getCancelados(1, 3).subscribe(data=>{
//         this.loading = false;
//         this.tabla = 2
//         console.log('Cancelados');
//         console.log(data);
//         this.user = data.Data;
//       })
//       return;
//     }
//   }
//
//
//
// }
