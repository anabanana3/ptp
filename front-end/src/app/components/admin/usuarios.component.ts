import { Component, OnInit } from '@angular/core';
import { SolicitanteService } from "../../services/solicitante.service";


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  user:any[]=[];
  loading:boolean = true;

  constructor(private _userService:SolicitanteService) {
    this._userService.getUsuarios().subscribe(data=>{
      console.log(data);

      console.log(this.user);
      this.loading = false;
      this.user = data;

    })
  }

  ngOnInit() {
  }

}
