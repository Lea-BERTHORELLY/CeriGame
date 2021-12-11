
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {


  showThemes = true;
   etape!: number;
  constructor(public quizzService : QuizzService ,  private router : Router) { }

  ngOnInit(): void {
	
    this.showThemes = true;
    this.getThemes();
    this.etape =1;
  }

     nextStep(){
       this.etape++;
       console.log(this.etape);
    };



  getThemes(){

      this.quizzService.getThemes().subscribe((response : any) =>{

        this.quizzService.themes = response;
        
        
      },(error: any) =>{
        console.log('Error is : ' , error);
    })

  }


  selectTheme(theme : String ){
  
      this.quizzService.getQuestions(theme).subscribe((response : any) =>{

        this.quizzService.quizz = response;
        this.showThemes = false;       

      },(error: any) =>{
        console.log('Error is : ' , error);
    })
   
  }


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
