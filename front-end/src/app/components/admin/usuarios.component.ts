import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProfesionesService } from "../../services/profesiones.service";
import {AsociacionesService} from "../../services/asociaciones.service";
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
  asociaciones;

  paginas = new Array();
  totalPag;
  pagActual;
  pagInicio;
  pagFinal;
  startIndex;
  endIndex;
  tamPag:number = 10;

  loading:boolean = true;
  searchNombre = null;
  searchEmail = null;
  searchProfesion = 0;
  searchAsociacion = 0;
  tabla:number = 0;
  /* tabla
    0: Solicitantes
    1: Registrados
    2: Cancelados
  */

  displayedColumns = ['nombre', 'email', 'profesion', 'asociacion', 'fecha', 'opciones'];

  mensaje:string = '';
  error:boolean = true;
  constructor(private _userService:UserService, private activatedRoute:ActivatedRoute,
    private _profesionesService:ProfesionesService, private _asociacionesService:AsociacionesService){
    if(sessionStorage.getItem('iD') !== '44'){
      return;
    }
    this.error = false;
    this.getSolicitantes(1, this.tamPag);

    this._profesionesService.getProfesiones().subscribe(data => {
      if(data.Codigo == '501'){
        location.href = '/expired';
      }else{
        this.profesiones = data;
      }
    })

    this._asociacionesService.getAsociacionesValidadas().subscribe(data => {
      if(data.Codigo == '501'){
        location.href = '/expired';
      }else{
        // console.log(data);
        this.asociaciones = data;
      }
    })
  }

  getSolicitantes(pag, tamPag){
    this._userService.getSolicitantes(1,this.tamPag).subscribe(data=>{
      if(data.Codigo == '501'){
        location.href = '/expired';
      }else{
        this.loading = false;
        this.resultado = data;
        this.usuarios= this.resultado.Data;
        this.pagActual = this.resultado.Pagina;
        this.paginacion( this.resultado.Paginas_Totales,this.resultado.Pagina, this.tamPag)
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

        this.getSolicitantes(this.pagActual, this.tamPag);
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
  this.tabla = number;
    if(number == 0){
      this.getSolicitantes(pagina, this.tamPag);
      return;
    }

    if(number == 1){
      this._userService.getRegistrados(pagina, this.tamPag).subscribe(data=>{
        if(data.Codigo == 501){
          location.href = '/expired';
        }else{
          this.loading = false;
          this.resultado = data;
          // console.log(data);

          this.usuariosOLD = data.Data;
          this.usuarios= this.resultado.Data;
          this.pagActual = this.resultado.Pagina;
          this.paginacion( this.resultado.Paginas_Totales,this.resultado.Pagina, this.tamPag)
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
          this.resultado = data;
          this.usuariosOLD = data.Data;
          this.usuarios= this.resultado.Data;
          this.pagActual = this.resultado.Pagina;
          this.paginacion( this.resultado.Paginas_Totales,this.resultado.Pagina, this.tamPag);
        }
      })
      return;
    }
  }

  paginacion(totalPag, pagActual, tamPag){
    let pagInicio, pagFinal;
    if(totalPag <= 10){
      pagInicio = 1;
      pagFinal = totalPag;
    }else{
      if(pagActual <= 6){
        pagInicio = 1;
        pagFinal = 10;
      }else if(pagActual + 4 >= totalPag){
        pagInicio = totalPag - 9;
        pagFinal = totalPag;
      }else{
        pagInicio = pagActual - 5;
        pagFinal = pagActual + 4;
      }
    }

    let startIndex = (pagActual -1)*tamPag;
    let endIndex = Math.min(startIndex + tamPag - 1, totalPag - 1);
    let pages = new Array();
    if(totalPag != undefined){
       pages = Array.from(Array((pagFinal + 1) - pagInicio).keys()).map(i => pagInicio + i);
    }

    //Despues de tener todo calculado guardo los datos
    this.pagActual = pagActual;
    this.pagInicio = pagInicio;
    this.pagFinal = pagFinal;
    this.startIndex = startIndex;
    this.paginas = pages;
    this.totalPag = totalPag;
    // console.log(this.paginas);
  }


 pasarPagina(pag){

   this.filter(pag);
 }



  filter(pag){

    let searchProfesion = null;
    let searchAsociacion = null;
    if(this.searchEmail === '')
      this.searchEmail = null;
    if(this.searchNombre === '')
      this.searchNombre = null;
    if(this.searchProfesion != 0)
      searchProfesion = this.searchProfesion;
    if(this.searchAsociacion != 0)
      searchAsociacion = this.searchAsociacion;

    if(this.searchNombre === null && this.searchEmail === null && searchProfesion === null && searchAsociacion === null){
      this.view(this.tabla, pag);
      return;
    }

    this._userService.filtroUsuarios(this.tabla, this.searchNombre, this.searchEmail, searchProfesion, searchAsociacion, pag, this.tamPag)
      .subscribe(data => {
        if(data.Codigo == 501){
            location.href = '/expired';
        }else{
          this.loading = false;
          this.usuarios = data.Data;
          this.paginacion( this.resultado.Paginas_Totales,this.resultado.Pagina, this.tamPag)
        }
      })
  }

  activate(id, email){
    this._userService.activateUsuario(id, email).subscribe(data => {
      if(data.Codigo == 501){
          location.href = '/expired';
      }else{
        // console.log(data);
        if(data.Resultado === 'OK'){
          this.loading = true;
          this.mensaje = 'Usuario validado Correctamente!';
          document.getElementById('alert').className = 'alert alert-success';

          if(this.tabla === 0){
            this.getSolicitantes(this.pagActual, this.tamPag);
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
