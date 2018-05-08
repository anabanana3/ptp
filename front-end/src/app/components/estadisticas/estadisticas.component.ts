import { Component} from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent{

  asociacion:boolean = false;
  error:boolean = true;

  constructor() {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }
  }


}
