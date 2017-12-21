import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  sesionid:string = "";

  constructor(private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("iD")){
      this.sesionid = sessionStorage.getItem("iD");
    }
  }

  logout(){
    sessionStorage.clear();
    location.href = '/login';
  }

}
