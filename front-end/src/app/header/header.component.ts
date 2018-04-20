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
  }

cerrarSesion() {
  sessionStorage.clear();
  location.href = '/';
}
}
