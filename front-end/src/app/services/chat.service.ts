import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  socket;
  url;

  constructor() {}

  connectSocketServer(){               //TODO indicar que un usuario ya está conectado
      let token = sessionStorage.token;
      let userId = sessionStorage.iD;

  //    console.log(sessionStorage.connected);

    //  if(sessionStorage.connected === undefined){
        console.log('intentadno conectar con el socket del servidor');
        this.socket = io.connect('https://aisha.ovh:8080');
      //  sessionStorage.connected = 1;



    //  }
      this.socket.emit('idUser',token);   //emit -> manda un mensaje al servidor
      //this.socket = socket;
      console.log(this.socket);
      //return socket.on('mensajes');
      let observable = new Observable(observer =>{  //los mensajes siempre se manejan con observable
        this.socket.on('mensajes', (data)=>{  //on -> está a la espera
          observer.next(data);
        });
      })

      // this.getUsuariosConectados(userId);
      // console.log(this.getUsuariosConectados(userId));
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

  getUsuariosConectados(userId) {
    let observable = new Observable(observer => {
      //this.socket = io(this.url);
      this.socket.emit('UsersConnected',sessionStorage.iD);
        this.socket.on('UsersConnected', (data)=>{
        observer.next(data);
        })
    })
     return observable;
   }

  logout(){
    console.log('Logout del servicio')
    this.socket.emit('logout', sessionStorage.iD);
    //sessionStorage.connected.removeItem();
  }
}
