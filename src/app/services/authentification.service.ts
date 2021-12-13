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
  VerifyId(username: string, password: string) : Observable<any> {
    return this._http.post<any>('http://pedago.univ-avignon.fr:3115/login', {username: username, password: password});
  }


}