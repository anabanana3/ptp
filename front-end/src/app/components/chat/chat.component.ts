import { Component, OnInit} from '@angular/core';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})

export class ChatComponent implements OnInit{
  mensajes = new Object;
  conversaciones = new Object;
  conversacion = new Object;
  connection;
  mensaje;
  socket;

  constructor(private _chatService: ChatService ) {
    console.log(sessionStorage.iD);
      _chatService.connectSocketServer().subscribe(data=>{
        this.conversaciones = data;
        console.log("Conversaciones: ");
        console.log(this.conversaciones);
    });
  }

  enviarMensaje(id1, id2, socket){
    console.log('Metodo para enviar mensaje');
    console.log(this.mensaje);

    this._chatService.sendMessage(this.mensaje, id1, id2, sessionStorage.iD, socket);
  }

  getMessages(id1, id2){
    this.conversacion = {
      ID_Usuario1: id1,
      ID_Usuario2: id2
    }
    this._chatService.getMessages(id1, id2).subscribe(data => {
      this.mensajes = data;
    });
  }

  salir(){
    console.log('Salgo de chat');
    this._chatService.logout();
  }

  ngOnInit() {}

}
