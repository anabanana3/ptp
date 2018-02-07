import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent implements OnInit {
  slideIndex:number = 1;
  n:number = 0;
  i:number = 0;

  constructor() { }

  ngOnInit() {
  }

  plusDivs(n) {
    console.log("entro en plusDivs()");
    this.showDivs(this.slideIndex += n);
  }

  showDivs(n) {
    console.log("entro en showDivs()");
    var x = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;

    if (n > x.length) {
      this.slideIndex = 1
    }

    if (n < 1) {
      this.slideIndex = x.length
    }

    for (let i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    x[this.slideIndex-1].style.display = "block";/*
    x[this.slideIndex-1].style.visibility = "visible";
    x[this.slideIndex-1].style.transition = "opacity 2s ease-in-out";*/
  }


}
