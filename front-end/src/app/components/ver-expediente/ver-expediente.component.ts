import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-expediente',
  templateUrl: './ver-expediente.component.html',
  styleUrls: ['./ver-expediente.component.css']
})
export class VerExpedienteComponent implements OnInit {

  expID:number;
  expediente = new Array();
  bloque1 = new Array();

  constructor(private _expedientesService:ExpedientesService, private router:ActivatedRoute) { }

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
      console.log('b1: '+this.bloque1);
    })
  }

}
