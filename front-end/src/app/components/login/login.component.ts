import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private activatedRoute:ActivatedRoute) { }

}
