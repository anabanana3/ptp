import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ExpedientesService} from "../../../services/expedientes.service";
import {MaterialService} from "../../../services/material.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html'
})
export class HistoricoComponent{
  tamPag = 10;
  displayedColumns = ['titulo', 'fecha', 'enlace'];

  //mostrar expedientes o recursos
  opcion = 1;
  idUsuario;
  nombreUsuario;
  //tipo - admin o asociacion
  tipo;
  expedientes;
  recursos;
  data;
  error:boolean = true;
  loading:boolean = false;

  constructor(
    private _expedienteService:ExpedientesService, private router:ActivatedRoute,
    private _userService:UserService, private _materialService:MaterialService
  ) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    this.idUsuario = router.snapshot.params['id'];
    this.tipo = router.snapshot.routeConfig.path.split("/")[0];
    _userService.getUsuario(this.idUsuario).subscribe(data => {
      this.nombreUsuario = data[0].Nombre.split("'")[1];
    })
    _expedienteService.getExpedientesPubById(this.idUsuario).subscribe(data => {
      this.expedientes = data;
      this.data = data;
      this.loading = true;
    })
    //getRecursos
    _materialService.getMaterialesByUser(this.idUsuario).subscribe(data => {
      this.recursos = data;
    })
  }

  cambiarOpcion(opcion){
    this.opcion = opcion;
    if(opcion == 1){
      this.data = this.expedientes;
    }
    if(opcion == 2){
      this.data = this.recursos;
    }
  }
}
