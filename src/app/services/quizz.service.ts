import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  /*themes!: string;
  quizz!: JSON;*/

  constructor(private http : HttpClient) { }


  getThemes() : Observable<any> {
    return this.http.get<any>('http://pedago.univ-avignon.fr:3115/quizz');
  }

  getQuestions(theme : String) {
    return this.http.post(`http://pedago.univ-avignon.fr:3115/questions`, {theme});
  }

  addGame(date_jeu:number,difficulte: number, bonnes_rep: number, temps: number, score: number){
    return this.http.post('http://pedago.univ-avignon.fr:3115/ajoutPartie', { date_jeu, difficulte, bonnes_rep, temps, score });
  }

}
