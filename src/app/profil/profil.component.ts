import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BandeauService } from '../services/bandeau.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  bandeau : BandeauService;
  profile : ProfileService;
  @Input() humeur: any;
  @Input() image: any;
  @Input() mdp:any;

  nom!: String;
  prenom!: String;
  identifiant!: String;
  date_naissance!: String;

  router: Router;
  constructor(_router : Router, _bandeau : BandeauService, _profile : ProfileService) {
    this.router=_router;
    this.bandeau=_bandeau;
    this.profile=_profile;
   }

  ngOnInit(): void {
    this.nom = JSON.parse(sessionStorage.getItem('user') || '{}').nom;
    this.prenom = JSON.parse(sessionStorage.getItem('user') || '{}').prenom;
    this.identifiant = JSON.parse(sessionStorage.getItem('user') || '{}').identifiant;
    this.date_naissance=JSON.parse(sessionStorage.getItem('user') || '{}').date_de_naissance;
   
  }

  Modify(formProfile : any){
    this.profile.ModifyProfile(formProfile.form.value.humeur, formProfile.form.value.image,  formProfile.form.value.mdp).subscribe((data: any) => 
    {
      if(formProfile.form.value.humeur!=null || formProfile.form.value.image!=null || formProfile.form.value.mdp!=null  ){
        this.bandeau.bandeauInfo = "Profil modifié ! ";
        this.router.navigate(['accueil']);
      }
      this.router.navigate(['accueil']);
    });
  }



}
