
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
  showThemes = true;
  choixDiff!:boolean;
  choixTheme!:boolean;

  theme!:any;
  themes!: any;
  quizz!: any;

  score: number=0;

  tps_par_question!: number; //temps mis pour répondre à une question
  tps_total!: number; //temps mis pour faire tout le quizz

  nb_questions: number=0; //nombre de questions déjà passées
  nb_reponses_justes: any=0; //nombre de bonnes réponses

  reponses_justes!: any[]; //réponses justes
  reponses_choisies!: any[]; //réponses choisies

  constructor(public quizzService : QuizzService ,  private router : Router,_bandeau : BandeauService) { 
    this.bandeau=_bandeau;
  }

  ngOnInit(): void {
    //this.bandeau.bandeauInfo = "Bienvenue sur la page du quizz, choisissez une difficulté ";
    this.showThemes = true;
    this.getThemes();
    //this.etape =1;
    this.choixDiff=true;
    this.choixTheme=false;
  }

  toThemes(){
    //this.bandeau.bandeauInfo = "Choisissez un thème ";
    this.choixDiff=false;
    this.choixTheme=true;
 };

    /*nextStep(){
       this.etape++;
    };*/



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
    this.reponses_choisies[this.nb_questions]=proposition; //on stocke le choix dans le tableau des réponses choisies
    this.bandeau.bandeauInfo = "Proposition récupérée ! Votre score est de  "+ this.score;
    
    if(proposition == this.quizz[this.nb_questions].réponse){
      this.reponses_justes[this.nb_questions]=proposition;
      this.nb_reponses_justes++;
      this.score += 100;
      this.bandeau.bandeauInfo = "Réponse juste ! Votre score passe à  "+ this.score;
    }
    else{
      this.score -=20;
      this.bandeau.bandeauInfo = "Réponse fausse ! Votre score passe à  "+ this.score;
    }
    this.nb_questions++;
  }


/*answer(questionId: any , reponses_choisies: any){

  
  // si le joueur à choisi la bonne réponse
  if(this.quizz[this.nb_questions].réponse == 
    this.quizz[this.nb_questions].propositions[reponses_choisies]){

      // stockage des id de questions correctement répondues
      this.reponses_justes[this.nb_reponses_justes] = this.quizz[this.nb_questions].id;
      // incrémentation de nombre des réponses correctes
      this.nb_reponses_justes++;
      
  }

  // stockage du choix dans un tableau 
  this.reponses_choisies[this.nb_questions] = reponses_choisies;

  // Pour passer à la question suivante 
  this.nb_questions++;
  
  // verifier si le quizz est fini (dans ce cas nous avons 5 questions au total)
  if(this.nb_questions == 5){
    //clearInterval(this.timer);
    this.router.navigate(['accueil']);
  }
}*/

  /*@Input()
  themes!: string[];
  @Input() name!: string;

  @Output('selectedTheme')
  sendSelectedThemeEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {}

  onThemeSelected = (theme: string) : void => {
    this.sendSelectedThemeEmitter.emit(theme);
  }
  select() : void {
    console.log(this.name + ' clicked');
    
    this.sendSelectedThemeEmitter.emit(this.name);
  }*/


  /*liste_de_themes!: any[];

  constructor(private quizz: QuizzService) { }

  ngOnInit(): void {
    this.getTheThemes();
  }
  
  getTheThemes(){
    this.quizz.getThemes().subscribe(
      response => {
        this.liste_de_themes = response;
        console.log(this.liste_de_themes);
      },
      error => {
        console.log("Erreur: thèmes non récupérés");
      }
    )
  }*/

}
