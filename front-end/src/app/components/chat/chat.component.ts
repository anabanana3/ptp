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
  socketID;
  //Variable para obtener resultados de busqueda
  resultSearch;

  constructor(private _chatService: ChatService ) {
    console.log(sessionStorage.iD);
    _chatService.connectSocketServer().subscribe(data=>{
        this.socketID = data;
        sessionStorage.Connect = 1;
        console.log("socketID: ");
        console.log(this.socketID);
    });
}

  enviarMensaje(id1, id2, socket){
    console.log('Metodo para enviar mensaje');
    console.log(this.mensaje);
    console.log(socket);
    //Antes de mandar mensaje tengo que compribar si ha
    //ha cambiado algun valor de id socket de las conversaciones
    this._chatService.getConversations().subscribe(data=>{
      this.conversaciones = data;
      console.log('Conversaciones:');
      console.log(this.conversaciones);
    })

    this._chatService.sendMessage(this.mensaje, id1, id2, sessionStorage.iD, socket, this.socketID);
  }

  getMessages(id1, id2,s, nombre){
    this.conversacion = {
      Nombre: nombre,
      ID_Usuario1: id1,
      ID_Usuario2: id2,
      SocketID: s
    }
    console.log(this.conversacion)
    this._chatService.getMessages(id1, id2).subscribe(data => {
      this.mensajes = data;
    });
  }

  buscarUsuarios(search){
    console.log('Metodo para buscar usuarios');
    console.log(search);
    this._chatService.searchUsers(search).subscribe(data =>{
      this.resultSearch =  data;
      console.log(data);
    })
  }

  salir(){
    console.log('Salgo de chat');
    this._chatService.logout();
  }

  ngOnInit() {
    this._chatService.getConversations().subscribe(data =>{
      this.conversaciones = data;
      console.log('Conversaciones:');
      console.log(this.conversaciones);
    });
  }

}
