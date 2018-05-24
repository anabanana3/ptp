import { Component } from '@angular/core';

@Component({
  selector: 'app-lateralOptions',
  templateUrl: './lateralOptions.component.html'
})
export class LateralOptionsComponent{

  expanded:boolean = true;
  option = 2;
  error:boolean = true;

  constructor(){
    if(sessionStorage.getItem('iD') !== '44'){
      return;
    }
    this.error = false;

  }

  logout(){
    sessionStorage.clear();
    location.href = '/login';
  }
  activo(num){
    sessionStorage.setItem('ventana', num);
    if( sessionStorage.ventana != 0){
      document.getElementById(num).className = "active";
    }
  }
  changeOption(option){
    this.option = option;
  }

    myFunction() {
        var x = document.getElementById("myTopnav");
          if (x.className === "menuNav") {
              x.className += " responsive";
          } else {
              x.className = "menuNav";
          }

    }
}
