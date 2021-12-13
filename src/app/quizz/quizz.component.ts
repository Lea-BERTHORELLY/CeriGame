
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BandeauService } from '../services/bandeau.service';
import { QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  bandeau : BandeauService;
  date!:any;
  showThemes = true;
  choixDiff!:boolean;
  choixTheme!:boolean;

  theme!:any;
  themes!: any;
  quizz!: any;

  difficulte!:any;
  score: number=0;

  tps_par_question: number=0; //temps mis pour répondre à une question
  tps_total: number=0; //temps mis pour faire tout le quizz

  nb_questions: number=0; //nombre de questions déjà passées
  nb_reponses_justes: any=0; //nombre de bonnes réponses

  reponses_justes!: any[]; //réponses justes
  reponses_choisies!: any[]; //réponses choisies

  bonneReponse : string = "";

  constructor(public quizzService : QuizzService ,  private router : Router,_bandeau : BandeauService) { 
    this.bandeau=_bandeau;
  }

  ngOnInit(): void {
    this.showThemes = true;
    this.getThemes();
    this.choixDiff=true;
    this.choixTheme=false;
  }

  toThemes(difficulte : string){
    //this.bandeau.bandeauInfo = "Choisissez un thème ";
    if(difficulte == "facile"){
      this.difficulte = 1;
    }
    else if(difficulte == "moyen"){
      this.difficulte = 2;
    }
    else if(difficulte == "difficile"){
      this.difficulte = 3;
    }
    this.choixDiff=false;
    this.choixTheme=true;
    this.bandeau.bandeauInfo = "Difficulté choisie : "+difficulte;
 };


  getThemes(){

      this.quizzService.getThemes().subscribe((response : any) =>{
        this.themes = response;
      },(error: any) =>{
        console.log('Error is : ' , error);
    })

  }


  selectTheme(event: Event ){
      this.theme= (event.target as HTMLInputElement).value;
      this.quizzService.getQuestions(this.theme).subscribe((response : any) =>{
        this.quizz = response;
        this.showThemes = false; 
      },(error: any) =>{
        console.log('Error is : ' , error);
    })
   
  }




  choix(proposition : string){
    this.bonneReponse = this.quizz[this.nb_questions].réponse;
    if(proposition == this.bonneReponse){
      this.score += 100*(this.difficulte);
      //this.reponses_justes[this.nb_questions].push(proposition);
      this.nb_reponses_justes++;
      this.bandeau.bandeauInfo = "Réponse juste ! Votre score passe à  "+ this.score;
      this.nb_questions++;
    
    }
    else{
      this.score -=20*(this.difficulte);
      this.bandeau.bandeauInfo = "Réponse fausse ! Votre score passe à  "+ this.score;
      this.nb_questions++;
    }

    //this.reponses_choisies[this.nb_questions]=proposition; //on stocke le choix dans le tableau des réponses choisies
    if(this.nb_questions==5){ 
      this.bandeau.bandeauInfo = "Quizz terminé  ! Votre score est de "+ this.score+" !";
      //this.router.navigate(['accueil']);
      this.AddGame();
    }
    
    //this.bandeau.bandeauInfo = "Réponse : "+ this.reponse +" nb question : "+this.nb_questions;
  }

  AddGame(){
    this.date=new Date().toDateString();
    this.quizzService.addGame(this.date,this.difficulte,this.nb_reponses_justes,this.tps_total,this.score).subscribe((data: any)=>{
      this.router.navigate(['accueil']);
    })
  }

}
