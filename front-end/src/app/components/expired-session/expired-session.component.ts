import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expired-session',
  templateUrl: './expired-session.component.html'
})
export class ExpiredSessionComponent implements OnInit {

  constructor() {
    //Cuando se cree este componente cerramos la sesion de un usuario
    sessionStorage.clear();
   }

  ngOnInit() {
  }

}
