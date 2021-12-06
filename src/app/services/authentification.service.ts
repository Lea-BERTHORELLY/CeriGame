import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class AuthentificationService {
  

constructor(private _http : HttpClient){}

  IsLogged() : boolean {
    if(localStorage.getItem('accessToken') == 'true')
    {
      return true;
    }   
    else
    {
      return false;
    }
    
  };
  /*VerifyId(username : string, password : string) : Observable<boolean> {
    var trueId : boolean = false;
    return Observable.create((observer: Subscriber<boolean>) => {
    this._http.post<any>('http://pedago.univ-avignon.fr:3115/login/',{username : username, password : password}).subscribe(
      (data: { statusResp: any; data: { user: any; }; }) => {
        if(data.statusResp){
          localStorage.setItem('user',JSON.stringify(data.data.user));
          trueId = true;
        }
        else{
          trueId = false;
        }
      },
      (error: any) => {
        console.error('une erreur est survenue!', error);
        trueId = false;
      },
      () => {
        observer.next(trueId); 
      }
      );
    });

  }*/
  VerifyId(username: string, password: string) : Observable<any> {
    return this._http.post<any>('http://pedago.univ-avignon.fr:3115/login', {username: username, password: password});
  }


}