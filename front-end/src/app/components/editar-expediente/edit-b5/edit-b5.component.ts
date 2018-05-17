import { Component, OnInit } from '@angular/core';
import { ExpedientesService } from '../../../services/expedientes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-b5',
  templateUrl: './edit-b5.component.html'
})
export class EditB5Component implements OnInit {

  bloque5;

  constructor(private router:Router, private _expedientesService: ExpedientesService, private activatedRoute: ActivatedRoute) {
    let id:number;
    activatedRoute.params.subscribe(params=>{
      id = params['id'];
    });
    this._expedientesService.getBloque5(id).subscribe(data=>{
      console.log('=====================================');
      console.log(data);
      this.bloque5 = data[0];
      //Limpio el formato de los campos que obtengo de la BD
      if(this.bloque5.Consejos == "''"){
        this.bloque5.Consejos = '';
      }else{
        this.bloque5.Consejos = this.bloque5.Consejos.split("'")[1];
      }
      if(this.bloque5.Intervencion == "''"){
        this.bloque5.Intervencion = '';
      }else{
        this.bloque5.Intervencion = this.bloque5.Intervencion.split("'")[1];
      }
    })


  }

  ngOnInit() {
  }

}
