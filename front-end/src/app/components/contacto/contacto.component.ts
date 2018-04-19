import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService} from "../../services/user.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

  constructor(private _userService:UserService, public dialog: MatDialog) {}

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
    this._userService.sendEmail(this.json).subscribe(data =>{
      if(data.Codigo == 400){
        //Abrir un popUp para hacer la confirmación
        this.openDialog();

      }
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ContactPopup, {
      width: '1000px',
      //data: { partos: this.partos, auxM: this.auxM, auxN: this.auxN }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      location.href = '/';
    });
  }


}

@Component({
  selector: 'popup',
  templateUrl: 'popup.component.html',
})
export class ContactPopup {

  constructor(
    public dialogRef: MatDialogRef<ContactPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
