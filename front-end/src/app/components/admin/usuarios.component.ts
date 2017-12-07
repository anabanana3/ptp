import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  user:any[]=[];
  loading:boolean = true;

  constructor(private _userService:UserService) {
    this._userService.getUsuarios().subscribe(data=>{
      console.log(data);

      console.log(this.user);
      this.loading = false;
      this.user = data;

    })
  }

  ngOnInit() {
  }

  borraUsuario(id$:string){
    this._userService.borraUsuario(id$).subscribe(res=>{
      console.log(res);
      if(res){
        //si todo es correcto res=null
        console.log(res);
      }
      else{
        //todo correcto -> hemos borrado
        delete this.user[id$];
      }
    })
  }

}
