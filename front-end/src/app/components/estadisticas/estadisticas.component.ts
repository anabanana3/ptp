import { Component} from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent{

  asociacion:boolean = false;

  constructor() {
    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }
  }


}
