import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopTenService {

  constructor(private http : HttpClient) { }

  getTopTen(){
    return this.http.get<any>('http://pedago.univ-avignon.fr:3115/accueil');
  }

}
