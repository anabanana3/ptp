import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  mensajes = new Object;
  connection;
  mensaje;
  socket;
  UsersConnected;

  constructor(private _chatService: ChatService ) {
      _chatService.connectSocketServer().subscribe(data=>{
      this.mensajes = data;
      console.log(this.mensajes);

      _chatService.getUsuariosConectados(sessionStorage.iD).subscribe(data=>{
        console.log(data);
        this.UsersConnected=data;
      })

    });

    console.log('Hola');
  }

enviarMensaje(){
    console.log('Metodo para enviar mensaje');
    console.log(this.mensaje);
    this._chatService.sendMessage(this.mensaje);

  }

  salir(){
    console.log('Salgo de chat');
    //this.connection.unsubscribe();
    this._chatService.logout();
    //Cambiar la ruta
  }

  ngOnInit() {

    }

  ngOnDestroy() {
    console.log('Salgo de chat');
    //this.connection.unsubscribe();
    this._chatService.logout();
  }

}
