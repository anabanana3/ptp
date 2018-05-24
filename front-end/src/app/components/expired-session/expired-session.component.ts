import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expired-session'
})
export class ExpiredSessionComponent implements OnInit {

  constructor() {
    //Cuando se cree este componente cerramos la sesion de un usuario
    sessionStorage.clear();
   }

  ngOnInit() {
  }

}
