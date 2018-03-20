import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  socket;
  url;

  constructor() {}

  connectSocketServer(){
      let token = sessionStorage.token;
      let userId = sessionStorage.iD;

      console.log('intentando conectar con el socket del servidor');
      this.socket = io.connect('https://aisha.ovh:8080');

      this.socket.emit('idUser',token);   //emit -> manda un mensaje al servidor
      console.log(this.socket);

      let observable = new Observable(observer =>{
        this.socket.on('id', data =>{
          observer.next(data);
        })
      })
      return observable;
    }

    getConversations(){
      //---- Recuperar los chats activos ----//
      let observable = new Observable(observer => {
        this.socket.emit('conversaciones', sessionStorage.iD);
        this.socket.on('conversaciones', (data) => {
          observer.next(data);
        });
      })
    return observable;
    }

     sendMessage(p, id1, id2, miId, socket, autorSocket){
       console.log('Mando un evento al servidor');
       var mensaje= {
         ID_Usuario1: id1,
         ID_Usuario2: id2,
         Autor: miId,
         SocketIDAutor:autorSocket,
         SocketID: socket,
         Texto: p
       };
       this.socket.emit('SendMessage', mensaje);
       //El autor recupera los mensajes
       return this.getMessages(id1, id2);
       //return false;
     }

    getMessages(id1, id2) {
      var aux = {
        ID_Usuario1: id1,
        ID_Usuario2: id2,
        Autor: sessionStorage.iD
      }
      console.log(this.socket);
      let observable = new Observable(observer => {
        this.socket.emit('GetMessages', aux);
        this.socket.on('GetMessages', (data) => {
          observer.next(data);
          console.log(data);
        });
      })
      return observable;
    }

    searchUsers(search){
      let observable = new Observable(observer => {
        this.socket.emit('Search', search);
        this.socket.on('ResSearch', data => {
          observer.next(data);
        })
      });
      return observable;
    }

  logout(){
    console.log('Logout del servicio')
    this.socket.emit('logout', sessionStorage.iD);
  }
}
