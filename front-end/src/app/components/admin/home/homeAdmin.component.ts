import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homeAdmin',
  templateUrl: './homeAdmin.component.html'
})
export class HomeAdminComponent {

  error:boolean = true;
  constructor(){
    if(sessionStorage.getItem('iD') !== '44'){
      return;
    }
    this.error = false;
  }
}
