import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  socket;
  url;

  constructor() {


  }
  initConnection(){
    this.socket = io.connect();
  }
  connectSocketServer(userId2){
      let token = sessionStorage.token;
      let userId = sessionStorage.iD;
      console.log('intentadno conectar con el socjet del servidor');
      this.socket = io.connect('https://aisha.ovh:8080');
      this.socket.emit('idUser',token);
      //this.socket = socket;
      console.log(this.socket);
      //return socket.on('mensajes');
        let observable = new Observable(observer =>{
        this.socket.on('mensajes', (data)=>{
          observer.next(data);
        });
      })
      return observable;
      }




     sendMessage(p){
       console.log('Mando un evento al servidor');
       var mensaje= {
         Usuario: sessionStorage.token,
         Texto: p
       };
       //this.socket.emit('add-message', p);
       this.socket.emit('add-message', mensaje);
       return false;
     }

    getMessages() {
    let observable = new Observable(observer => {
      //this.socket = io(this.url);
      this.socket.on('mensajes', (data) => {
        observer.next(data);
      });
      /*return () => {
        this.socket.disconnect();
      };*/
    })
    return observable;
  }

  logout(){
    console.log('Logout del servicio')
    this.socket.emit('logout', sessionStorage.iD);
  }
}
