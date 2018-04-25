import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProfesionesService } from "../../services/profesiones.service";
import { User } from "../../interfaces/user.interface";
//Para las rutas
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosAdminComponent {

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
  usuariosOLD:User[];
  profesiones;

  //Para la paginacion
  paginas= new Array(3);
  pagNext;
  pagBack;
  pagActual;
  tamPag:number = 10;

  loading:boolean = true;
  searchNombre = null;
  searchEmail = null;
  searchProfesion = null;
  tabla:number = 0;
  /* tabla
    0: Solicitantes
    1: Registrados
    2: Cancelados
  */

  displayedColumns = ['id', 'nombre', 'email', 'profesion', 'asociacion', 'fecha', 'opciones'];

  mensaje:string = '';
  error:boolean = true;
  constructor(private _userService:UserService, private activatedRoute:ActivatedRoute,
    private _profesionesService:ProfesionesService){
    if(sessionStorage.getItem('iD') !== '44'){
      return;
    }
    this.error = false;
    this._userService.getSolicitantes(1,this.tamPag).subscribe(data=>{
      if(data.Codigo == '501'){
        location.href = '/expired';
      }else{
        this.loading = false;
        //this.user = data.Data;
        this.resultado = data;
        this.usuarios= this.resultado.Data;
        this.usuariosOLD = data.Data;
        this.pagActual = this.resultado.Pagina;
        this.paginacion(this.resultado.Pagina, this.resultado.Paginas_Totales);
        this.tamPag = this.resultado.Elementos_Pagina;

        console.log(data);
      }
    })

    this._profesionesService.getProfesiones().subscribe(data => {
      if(data.Codigo == '501'){
        location.href = '/expired';
      }else{
        this.profesiones = data;
      }
    })
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
        if(res.Codigo == 501){
          location.href = '/expired';
        }else{
          this.mensaje = 'Ha ocurrido un error!';
          location.href = '/admin/usuarios#arriba';
          document.getElementById('alert').className = 'alert alert-danger';
        }
      }
    })
  }

//Funcion con parametro por defecto => si recibe uno diferente lo cambia
  view(number, pagina=1){
    if(number == 0){
      this._userService.getSolicitantes(pagina, this.tamPag).subscribe(data=>{
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          this.loading = false;
          this.tabla = 0
          this.resultado = data;
          this.usuariosOLD = data.Data;
          this.usuarios= this.resultado.Data;
          this.pagActual = this.resultado.Pagina;
          this.paginacion(this.resultado.Pagina, this.resultado.Paginas_Totales);
        }
      })
      return;
    }

    if(number == 1){
      this._userService.getRegistrados(pagina, this.tamPag).subscribe(data=>{
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          this.loading = false;
          this.tabla = 1
          this.resultado = data;
          console.log(data);

          this.usuariosOLD = data.Data;
          this.usuarios= this.resultado.Data;
          this.pagActual = this.resultado.Pagina;
          this.paginacion(this.resultado.Pagina, this.resultado.Paginas_Totales);
        }
      })
      return;
    }

    if(number == 2){
      this._userService.getCancelados(pagina, this.tamPag).subscribe(data=>{
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          this.loading = false;
          this.tabla = 2
          this.resultado = data;
          this.usuariosOLD = data.Data;
          this.usuarios= this.resultado.Data;
          this.pagActual = this.resultado.Pagina;
          this.paginacion(this.resultado.Pagina, this.resultado.Paginas_Totales);
        }
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
  }

  pasarPagina(pag){
    this.view(this.tabla, pag);
    this.pagActual = pag;
  }

  cambiarTamPag(tam){
    this.tamPag=tam;
    this.view(this.tabla, 1);;
  }

  filter(){
    if(this.searchEmail === '')
      this.searchEmail = null;
    if(this.searchNombre === '')
      this.searchNombre = null;
    if(this.searchProfesion === '')
      this.searchProfesion = null;

    if(this.searchNombre === null && this.searchEmail === null && this.searchProfesion === null){
      this.usuarios = this.usuariosOLD;
      return;
    }

    this._userService.filtroUsuarios(this.tabla, this.searchNombre, this.searchEmail, this.searchProfesion, 1, this.tamPag)
      .subscribe(data => {
        if(data.Codigo == 501){
            location.href = '/expired';
        }else{
          this.loading = false;
          this.usuarios = data.Data;
          this.paginacion(data.Pagina, data.Paginas_Totales);
        }
      })
  }

  activate(id, email){
    this._userService.activateUsuario(id, email).subscribe(data => {
      if(data.Codigo == 501){
          location.href = '/expired';
      }else{
        console.log(data);
        if(data.Resultado === 'OK'){
          this.loading = true;
          this.mensaje = 'Usuario validado Correctamente!';
          document.getElementById('alert').className = 'alert alert-success';

          if(this.tabla === 0){
            this._userService.getSolicitantes(this.pagActual, this.tamPag).subscribe(data=>{
              if(data.Codigo == 501){
                location.href = '/expired';
              }else{
                this.loading = false;
                this.resultado = data;
                this.usuariosOLD = data.Data;
                this.usuarios= this.resultado.Data;
                this.pagActual = this.resultado.Pagina;
                this.paginacion(this.resultado.Pagina, this.resultado.Paginas_Totales);
              }
            })
          }
        }
        else{
          this.mensaje = 'Ha ocurrido un error!';
          document.getElementById('alert').className = 'alert alert-danger';
        }
      }
    })
  }
}
