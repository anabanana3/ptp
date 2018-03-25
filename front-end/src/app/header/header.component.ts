import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

cerrarSesion() {
  sessionStorage.clear();
  //Redirect to home-page
  location.href = '/';
}
}
