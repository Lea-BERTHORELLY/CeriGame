import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { io } from 'socket.io-client';


@Injectable()
export class WebSocketService {
  socket;
  constructor(){
// Connexion au serveur pour mise en place webSocket
    this.socket = io('http://pedago.univ-avignon.fr:3115');
  }
  // Méthode d’écoute des événements venant du serveur (utilisation des observables pour activation dès réception d’un événement!) en s’appuyant sur socket.io-client
  listen(eventname : string) : Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(eventname, (data) => {
              subscribe.next(data);
      })
    })
  }
  // Méthode d’envoi au serveur d’un événement et données associées en s’appuyant sur socket.io-client
  emit(eventname: string, data: any){
    this.socket.emit(eventname, data);
  }
}
