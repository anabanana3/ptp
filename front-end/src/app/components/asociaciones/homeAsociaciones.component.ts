import { Component } from '@angular/core';
import { SolicitanteService } from "../../services/solicitante.service";
import { Solicitante } from "../../interfaces/solicitante.interface";

@Component({
  selector: 'app-homeAsociaciones',
  templateUrl: './homeAsociaciones.component.html'
})
export class HomeAsociaciones{

  solicitantes:Solicitante ={
    Nombre:'',
    Apellidos: '',
    F_Nacimiento: '',
    Email: '',
    ID_Asociacion: 0,
    ID_Profesion: 0,
    ID_Lugar: '',
    Direccion: '',
    Sexo: '',
    DNI: ''
  };

  id:number = 5;
  loading:boolean = false;
  asociacion:string = '';



  constructor(private _solicitanteService:SolicitanteService) {

    this._solicitanteService.getUsuarioAsociacion(this.id).subscribe(data =>{
      console.log(data);

      this.solicitantes = data;

      this.asociacion = this.solicitantes[0].Asociacion;
    })
  }

  ngOnInit() {
  }

  borrar(id){
    this._solicitanteService.deleteUsuario(id).subscribe(res => {
      if(res){
        console.log(res);
      }
      else{
        console.log('borraaaar');
        delete this.solicitantes[id];
      }
    })
  }
}
