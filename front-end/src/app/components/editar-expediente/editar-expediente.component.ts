import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-editar-expediente',
  templateUrl: './editar-expediente.component.html',
})
export class EditarExpedienteComponent implements OnInit {

  asociacion:boolean = false;
  admin:boolean = false;
  usuario:boolean = false;
  error:boolean = true;

  expediente;
  selectedTab = 0;
  id;

  constructor(private router:Router, private _expedientesService: ExpedientesService, private activatedRoute: ActivatedRoute) {
    //Recupero la información del expediente
    if(sessionStorage.length === 0){
      return;
    }
    activatedRoute.params.subscribe(params=>{
      this.id = params['id'];
    });

    this.error = false;

    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }else if(sessionStorage.getItem('usuario') != null){
      this.usuario = true;
    }else if(sessionStorage.getItem('admin') != null){
      this.admin = true;
    }
    this._expedientesService.getExpedienteById(this.id).subscribe(data=>{
      if(data.Codigo ==501){
        this.router.navigate(['/expired']);
        return;
      }

      this.expediente = data[0];
      if(this.expediente.ID_Usuario != sessionStorage.iD){
        this.error = true;
      }
    })


   }

  ngOnInit() {
  }

//Para meter el id en la url y Angular la reconozca
//     this.router.navigate(['/recurso', id]);
}
