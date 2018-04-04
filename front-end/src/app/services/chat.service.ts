import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  socket;
  urlSearch = 'https://www.aisha.ovh/api/chat/search/';


  constructor(private http: Http) {}

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
    setConversation(id2){
      var aux = {
        ID_Usuario1: sessionStorage.iD,
        ID_Usuario2: id2
      }
      let observable = new Observable(observer => {
        this.socket.emit('SetConversation', aux);
        this.socket.on('GetIDConver', (data) => {
          console.log(data);
          observer.next(data);
        });
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

     sendMessage(p, id1, id2, miId, socket, autorSocket, destinatario){
       var mensaje= {
         ID_Usuario1: id1,
         ID_Usuario2: id2,
         Autor: miId,
         SocketIDAutor:autorSocket,
         SocketID: socket,
         Texto: p,
         Destinatario: destinatario
       };
       console.log('Mando un evento al servidor');
       console.log(mensaje);
       this.socket.emit('SendMessage', mensaje);
       //El autor recupera los mensajes
       return this.getMessages(id1, id2);
       //return false;
     }

     checkConversation(des, mensaje){
       console.log('Prueba de  el socketID')
       let aux
       this.socket.emit('getSocketID', des);
         this.socket.on('getSocketID', data =>{
            mensaje.SocketID = data[0].ID_Socket;
            console.log(data);
            console.log('muestro el mensaje a mandar');
            console.log(mensaje);
            //this.socket.emit('SendMessage', mensaje);
            //return this.getMessages(mensaje.ID_Usuario1, mensaje.ID_Usuario2);
         })
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

    searchUsers(search, id){
      //Buscar los usuarios como si fuera una peticion normal
      let url = this.urlSearch;
      url += 'u='+id+'&c='+search;
      console.log(url);
      return this.http.get(url).map(res => res.json())

    }

    searchUsers2(search, id){
      let busqueda = {
        Usuario: id,
        Criterios: search
      }
      console.log(busqueda);
      let observable = new Observable(observer => {
        this.socket.emit('Search', busqueda);
        this.socket.on('ResSearch', data => {
          observer.next(data);
        })
      });
      return observable;
    }


//     updateConversations2(){
//       this.socket.on('newConnection', data =>{
//         if(data == 0){
//           let observable = new Observable(observer => {
//             this.socket.emit('conversaciones', sessionStorage.iD);
//             this.socket.on('conversaciones', (data) => {
//               observer.next(data);
//             });
//           })
//         return observable;
//         }
//       })
//     }
//
// updateConversations(){
//   let observable = new Observable(observer => {
//     this.socket.on('newConnection', data =>{
//       if(data == 0){
//         this.socket.emit('conversaciones', sessionStorage.iD);
//         this.socket.on('conversaciones', (data) => {
//           observer.next(data);
//         });
//       }
//     });
//   });
//   return observable;
// }

  logout(){
    console.log('Logout del servicio')
    this.socket.emit('logout', sessionStorage.iD);
  }
}
