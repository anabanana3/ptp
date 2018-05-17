import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  Nombre:String;

  constructor() {
   this.Nombre = sessionStorage.Nombre.split("'")[1];
  }

  ngOnInit() {
    if( sessionStorage.ventana != 0){
      document.getElementById(sessionStorage.ventana).className += " active";
    }
  }

  cerrarSesion() {
    sessionStorage.clear();
    location.href = '/';
  }
  activo(num){
    sessionStorage.setItem('ventana', num);
    if( sessionStorage.ventana != 0){
      document.getElementById(num).className += " active";
    }
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
