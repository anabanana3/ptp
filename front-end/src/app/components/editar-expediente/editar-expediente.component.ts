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

  constructor(private router:Router, private _expedientesService: ExpedientesService, private activatedRoute: ActivatedRoute) {
    //Recupero la información del expediente
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }else if(sessionStorage.getItem('usuario') != null){
      this.usuario = true;
    }else if(sessionStorage.getItem('admin') != null){
      this.admin = true;
    }


   }

  ngOnInit() {
  }

//Para meter el id en la url y Angular la reconozca
//     this.router.navigate(['/recurso', id]);
}
