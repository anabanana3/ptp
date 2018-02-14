import { Component } from '@angular/core';
import { MaterialService } from "../../services/material.service";
import {Recurso} from '../../interfaces/recurso.interface';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html'
})
export class RecursosComponent {

  error:boolean = true;
  recursos = [];
  constructor(private _materialService:MaterialService) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;

    _materialService.getMateriales().subscribe(data => {
      this.recursos = data;
      console.log(this.recursos);
    }, error => {
      console.log(error);
    })
  }
}
