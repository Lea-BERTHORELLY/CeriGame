import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  ModifyProfile(humeur: String, image: String, mdp: String) {
    return this.http.post(`http://pedago.univ-avignon.fr:3115/profile`, { humeur, image, mdp });
  }

  GetProfile(){
    return this.http.get(`http://pedago.univ-avignon.fr:3115/profile`);
  }

  GetHistorique(){
    return this.http.get(`http://pedago.univ-avignon.fr:3115/historique`);
  }


}