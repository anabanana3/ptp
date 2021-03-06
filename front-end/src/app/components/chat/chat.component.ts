import { Component, OnInit, ElementRef} from '@angular/core';
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
  usuarioRegistrado;
  Destinatario;
  //Variable para obtener resultados de busqueda
  resultSearch = new Object;
  //Variable para maquetar los mensajes
  ID_Usuario = sessionStorage.iD;
  asociacion:boolean = false;
  admin:boolean = false;
  usuario:boolean = false;
  error:boolean = true;
  inicio:boolean = true;



  constructor(private _chatService: ChatService, private element:ElementRef ) {
    if(sessionStorage.length === 0){
      return;
    }
    this.error = false;
    console.log(sessionStorage.iD);
    _chatService.connectSocketServer().subscribe(data=>{
        this.socketID = data;
        sessionStorage.Connect = 1;
        console.log("socketID: ");
        console.log(this.socketID);
    });
    this.conversacion = {
      Nombre: "'Busque a un contacto y empiece a chatear!'",
    }
    if(sessionStorage.getItem('asociacion') != null){
      this.asociacion = true;
    }else if(sessionStorage.getItem('usuario') != null){
      this.usuario = true;
    }else if(sessionStorage.getItem('admin') != null){
      this.admin = true;
    }

  }
  setConversation(id2, nombre, f){
    console.log('Hola');
    this._chatService.setConversation(id2).subscribe(data =>{
      console.log('Muestro la data de setConversacion');
      console.log(data);

      this.conversacion = {
        Nombre: nombre,
        ID_Usuario1: data['ID_Usuario1'],
        ID_Usuario2: data['ID_Usuario2'],
        SocketID: "",
        Foto: f
      }
      this.inicio = false;
      console.log(this.conversacion['ID_Usuario2']);
      // TODO: volver a poner
      // this.getMessages(this.conversacion['ID_Usuario1'], this.conversacion['ID_Usuario2'], this.conversacion['SocketID'], nombre, 8);
    });
    document.getElementById("chat").setAttribute("class", "mostrar chat-container-responsive chat-container bgColorWhite");
    document.getElementById("contactos").setAttribute("class", "ocultar chat-contactos-responsive chat-contactos bgColorWhite");
  }

  escribiendo(e, search){
    console.log("escribiendo");
    console.log(e);
    console.log(search);
    if(search ==''){
      console.log('El input esta vacio');
      this.resultSearch = new Array();
      this.getConversations();
    }else{
      this.buscarUsuarios(search);
      this.conversaciones = new Array();
    }
  }

  enviarMensaje(id1, id2, socket){
    console.log('Metodo para enviar mensaje');
    console.log('Llamo al service para actualizar la info');
    this._chatService.sendMessage(this.mensaje,id1,id2,sessionStorage.iD, socket, this.socketID, this.Destinatario);
    //Borro el contendo del imput
    this.mensaje = '';

  }

  getMessages(id1, id2, s, nombre,d,f){
    console.log(id1);
    this.conversacion = {
      Nombre: nombre,
      ID_Usuario1: id1,
      ID_Usuario2: id2,
      SocketID: s,
      Foto: f

    }
    this.inicio = false;
    this.Destinatario = d;
    console.log(this.conversacion);
    this._chatService.getMessages(id1, id2).subscribe(data => {
      this.mensajes = data;

    });
    document.getElementById("chat").setAttribute("class", "mostrar chat-container bgColorWhite");
    document.getElementById("contactos").setAttribute("class", "ocultar chat-contactos bgColorWhite");
  }

  buscarUsuarios(search){
    console.log('Metodo para buscar usuarios');
    console.log(search);
    this._chatService.searchUsers(search, sessionStorage.iD).subscribe(data =>{
      this.resultSearch = data;
      console.log(data);
    });
  }

  salir(){
    console.log('Salgo de chat');
    this._chatService.logout();
  }

  getConversations(){
    console.log('Recupero las conversaciones');
    this._chatService.getConversations().subscribe(data =>{
      this.conversaciones = data;
      console.log('Conversaciones:');
      console.log(this.conversaciones);
    });
  }

  ngOnInit() {
    this.getConversations();
  }

  volver(){
    document.getElementById("chat").setAttribute("class", "ocultar chat-container bgColorWhite");
    document.getElementById("contactos").setAttribute("class", "mostrar chat-contactos bgColorWhite");
  }
}
