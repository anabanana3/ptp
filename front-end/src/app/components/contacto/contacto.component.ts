import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService} from "../../services/user.service";

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {

  json = {
    Email:'',
    Mensaje: ''
  }
  mensaje:string = '';

  constructor(private _userService:UserService) {}

  contactar(forma:NgForm){
    console.log(this.json);
    if(forma.valid === false){
      this.mensaje = 'Campos Incompletos';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
  //valida el mail
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(!emailRegex.test(this.json.Email)){
      this.mensaje = 'Email no válido';
      document.getElementById('alert').className = 'alert alert-danger';
      return;
    }
    this._userService.sendEmail(this.json).subscribe(data =>{ console.log(data) });
  }
}
