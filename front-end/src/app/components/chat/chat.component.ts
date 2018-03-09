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

  constructor(private _chatService: ChatService ) {
    //_cahtService.initConnection();
    _chatService.connectSocketServer(22).subscribe(data=>{
      this.mensajes = data;
      console.log(this.mensajes);



    })
    console.log('Hola');


  }

  enviarMensaje(){
    console.log('Metodo para enviar mensaje');
    console.log(this.mensaje);
    this._chatService.sendMessage(this.mensaje);

  }



  ngOnInit() {

  }

  ngOnDestroy() {
    console.log('Salgo de chat');
  //this.connection.unsubscribe();
}

}
