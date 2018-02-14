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
  aux2 = new Array();
  photos = new Array();
  n:number = 0;
  i:number = 0;
  parafecha:string = '';
  id:number = 0;
  arrayIds = new Array();

  logueado:boolean = false;
  admin:boolean = false;
  constructor(private _noticiasService:NoticiasService) {
    if(sessionStorage.length !== 0){
      this.logueado = true;

      console.log(sessionStorage.getItem('iD'));
      if(sessionStorage.getItem('iD') == '44'){
        this.admin = true;
      }
    }

    this._noticiasService.getNoticias().subscribe(data=>{
      console.log(data);
      this.noticias = data;
      console.log(data[0]);
    /*  console.log("fecha -> " + data[0].date);
      this.parafecha=data[0].date.split("-")[0];
      console.log("parafecha -> " + this.parafecha);*/

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

    this._noticiasService.getPhotos().subscribe(dataPhoto=>{
      console.log("dataPhoto: " +dataPhoto);
      this.photos = dataPhoto;
      console.log("aux value[0]: " + this.aux[0].id);
      console.log("aux value[1]: " + this.aux[1].id);
      console.log("aux value[2]: " + this.aux[2].id);

      console.log("dataPhoto.length: " + dataPhoto.length);
      for(let i=0;i<3;i++){
        console.log("¿Entras o k?");
          this.aux2.push(dataPhoto[i]);
          console.log("aux2 post: " + this.aux2[i].post);
      }

      console.log("long de aux2:" + this.aux2.length);
      for(let j=0; j < this.aux2.length; j++){
        console.log("j: " + j);
        console.log("aux value["+j+"]:" + this.aux[j].id);
        console.log("aux2 value["+j+"]:" + this.aux2[j].post);
        if(this.aux[j].id == this.aux2[j].post){
          console.log("yes papi es igual");
          this.arrayIds.push(this.aux2[j].guid.rendered);
        }else{
          if(this.aux[j].id == this.aux2[j+1].post){
            console.log("yes papi es igual");
            this.arrayIds.push(this.aux2[j].guid.rendered);
          }
        }
      }


      console.log("mediaa" + this.aux2);
      console.log("mediaa post id:" + this.arrayIds[0]);
      console.log("mediaa post id2:" + this.arrayIds[1]);
      console.log("mediaa post id3:" + this.arrayIds[2]);

      var caca =   document.getElementById("paraImg");
      var caca2 =   document.getElementById("paraImg2");
      var caca3 =   document.getElementById("paraImg3");

      /*document.getElementById("paraImg").style.backgroundImage=url("this.arrayIds[0]");*/
      /*caca.style.background='url('this.arrayIds[0]')';*/
      /*caca.style.background='url("this.arrayIds[0]")';*/
      /*caca.style.background='url("../../assets/img/Carrousel.png")';*/


      caca.style.backgroundImage = 'url("'+this.arrayIds[0]+'")';
      caca2.style.backgroundImage = 'url("'+this.arrayIds[1]+'")';
      caca3.style.backgroundImage = 'url("'+this.arrayIds[2]+'")';

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
