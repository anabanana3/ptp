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
  k:number = 0;
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
      this.noticias = data; //Creo que no sirve pa na
      console.log(data[0]);

      for(let i=0;i<3;i++){
        this.aux.push(data[i]);

      console.log("aux["+0+"] = " + this.aux[0]);

      }
     console.log("numnoticias" + this.aux);
    });

    this._noticiasService.getPhotos().subscribe(dataPhoto=>{
    //  console.log("dataPhoto: " +dataPhoto);
      this.photos = dataPhoto;
     console.log("aux value[0]: " + this.aux[0].id);
      console.log("aux value[1]: " + this.aux[1].id);
      console.log("aux value[2]: " + this.aux[2].id);

      console.log("dataPhoto.length: " + dataPhoto.length);
      for(let i=0;i<3;i++){
        if(i==0){
          this.aux2.push(dataPhoto[i]);
        }else{
          let k=i-1;
          console.log("i " + i +  "k " + k);
          console.log("this.aux2[i].post = " + this.aux2[i-1].post);

          if(this.aux2[i-1].post == this.aux2[k].post){
            console.log("YA HAY UN POST CON ESE ID");
            this.aux2.push(dataPhoto[i+1]);
          }
        }
       console.log("Se queda aux2 post: " + this.aux2[i].post);
      }

      console.log("long de aux2:" + this.aux2.length);
      for(let j=0; j < 3; j++){
        console.log("j: " + j);
        console.log("aux value["+j+"]:" + this.aux[j].id);
        console.log("aux2 value["+j+"]:" + this.aux2[j].post);
        if(this.aux[j].id == this.aux2[j].post){

          this.arrayIds.push(this.aux2[j].guid.rendered);
          console.log("yes papi es igual");
        }else{

          console.log("no es igual");
          console.log("j antes era: " + j);
          j=j+1;
          console.log("j ahora es: " + j );
        }
      }

     console.log("mediaa" + this.aux2);
      console.log("mediaa post id:" + this.arrayIds[0]);
      console.log("mediaa post id2:" + this.arrayIds[1]);
      console.log("mediaa post id3:" + this.arrayIds[2]);

      var caca =   document.getElementById("paraImg");
      var caca2 =   document.getElementById("paraImg2");
      var caca3 =   document.getElementById("paraImg3");

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
