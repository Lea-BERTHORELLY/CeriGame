import { Component, OnInit } from '@angular/core';
import { TopTenService } from '../services/top-ten.service';
import { ProfileService } from '../services';
import { BandeauService } from '../services';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  top_ten!: any[];

  constructor(private topten: TopTenService, private profile: ProfileService, private bandeau: BandeauService) { }

  ngOnInit(): void {
    this.getTheTopTen();
  }

  getTheTopTen(){
    this.topten.getTopTen().subscribe(
      response => {
        this.top_ten = response;
        console.log(this.top_ten);
      },
      error => {
        console.log("Erreur: classement non récupéré");
      }
    )
  }

  Logout(){
    this.bandeau.bandeauInfo = "Vous êtes déconnecté";
    this.profile.Logout().subscribe();
    
  }

}
