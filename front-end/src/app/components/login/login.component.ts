import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor( private activatedRoute:ActivatedRoute
 ) {


}

  ngOnInit() {
  }

}
