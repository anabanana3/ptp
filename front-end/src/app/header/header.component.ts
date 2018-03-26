import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  Nombre:String;

  constructor() {
   this.Nombre = sessionStorage.Nombre;
  }

  ngOnInit() {
  }

cerrarSesion() {
  sessionStorage.clear();
  //Redirect to home-page
  location.href = '/';
}
}
