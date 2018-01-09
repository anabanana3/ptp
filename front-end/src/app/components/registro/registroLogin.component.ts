import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Crypt from 'crypt';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registroLogin',
  templateUrl: './registroLogin.component.html'
})

export class RegistroLoginComponent {

  constructor(){
    let cryp:Crypt;

    let pass = "CacaDeLaVaca";

    let url = location.href.split('?')[1];
    console.log(url);
    console.log(cryp);
    let aux = cryp.decrypt([url], [pass]);

    let id = aux.split('#')[1];

    console.log(id);



  }
}
