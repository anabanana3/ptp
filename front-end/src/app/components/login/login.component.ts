import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';

import { AsociacionesService } from "../../services/asociaciones.service";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  json = {
    Email: '',
    Password: ''
  }

  check_asoc:boolean = false;

  constructor(private activatedRoute:ActivatedRoute, private router:Router,
    private _asociacionesService:AsociacionesService, private _userService:UserService) { }

  login(){
    console.log(this.json.Email);
    console.log(this.json.Password);

    if(this.check_asoc){
      //check == true -> asociacion
      this._asociacionesService.loginAsociacion(this.json)
        .subscribe(data =>{
          console.log(data);
        })
    }else{
      this._userService.loginUser(this.json)
        .subscribe(data =>{
          console.log(data);
        })
    }
  }
}
