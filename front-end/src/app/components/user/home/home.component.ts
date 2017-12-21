import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent{

  sesion:string = "";

  constructor() { }


  login(forma:NgForm){

    if(sessionStorage.getItem("iD")){
      console.log("holis esxisto");
      this.sesion = sessionStorage.getItem("iD");
    }


  }
}
