import { Component, OnInit } from '@angular/core';

import { NoticiasService } from "../../services/noticias.service";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent implements OnInit {
  slideIndex:number = 1;
  noticias = new Array();
  aux = new Array();
  photo = new Array();
  n:number = 0;
  i:number = 0;

  constructor(private _noticiasService:NoticiasService) {

    this._noticiasService.getNoticias().subscribe(data=>{
      console.log(data);
      this.noticias = data;
      console.log(data[0]);
    

      for(let i=0;i<3;i++){
        this.aux.push(data[i]);
      //  this.getPhoto(data[i]._links.wp:featuredmedia[0].href);

        // console.log(data[i]._links["wp:featuredmedia"]);
        // console("href"+ data[i]._links["wp:featuredmedia"][0].href );
        // this._noticiasService.getPhoto().subscribe(data=>{
        //   this.photo = data.guid.rendered;
        // });





      }
      console.log("numnoticias" + this.aux);



    });


  }

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
