import { Component } from '@angular/core';

@Component({
  selector: 'app-lateralOptions',
  templateUrl: './lateralOptions.component.html'
})
export class LateralOptionsComponent{

  expanded:boolean = false;
  option = 1;
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

  changeOption(option){
    this.option = option;
  }
}
