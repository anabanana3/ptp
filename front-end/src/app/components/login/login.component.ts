import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';

import { AsociacionesService } from "../../services/asociaciones.service";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private activatedRoute:ActivatedRoute) { }

  login(){
    
  }
}
