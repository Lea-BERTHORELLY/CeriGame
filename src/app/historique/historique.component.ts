import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  historique!: any[];
  username!: string;

  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
    this.getHisto();
    
  }

  getHisto(){
    
    this.profile.GetHistorique().subscribe(
      (      response: any) => {
        this.historique = response;
        console.log(this.historique);
      },
      (      error: any) => {
        console.log("Erreur: historique non récupéré");
      }
    )
  }

}
