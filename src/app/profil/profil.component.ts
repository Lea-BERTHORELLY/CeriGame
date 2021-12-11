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

  nom!: any;
  prenom!: any;
  imageProfil!: any;
  humeurActuelle!:any;

  router: Router;
  constructor(_router : Router, _bandeau : BandeauService, _profile : ProfileService) {
    this.router=_router;
    this.bandeau=_bandeau;
    this.profile=_profile;
   }

  ngOnInit(): void {
    this.GetProfile();
   /* this.nom = JSON.parse(sessionStorage.getItem('user') || '{}').nom;
    this.prenom = JSON.parse(sessionStorage.getItem('user') || '{}').prenom;
    this.identifiant = JSON.parse(sessionStorage.getItem('user') || '{}').identifiant;
    this.date_naissance=JSON.parse(sessionStorage.getItem('user') || '{}').date_de_naissance;*/
   
  }

  Modify(formProfile : any){
    this.profile.ModifyProfile(formProfile.form.value.humeur, formProfile.form.value.image,  formProfile.form.value.mdp).subscribe((data: any) => 
    {
      if((formProfile.form.value.humeur!=undefined) || (formProfile.form.value.image!=undefined) || (formProfile.form.value.mdp!=undefined)  ){
        this.bandeau.bandeauInfo = "Profil modifié ! ";
        localStorage.setItem("image",formProfile.form.value.image);
        localStorage.setItem("humeur",formProfile.form.value.humeur);
        this.router.navigate(['accueil']);
      }
      this.router.navigate(['accueil']);
    });
    this.GetProfile();
  }

  GetProfile(){
    this.profile.GetProfile().subscribe((data: any)=>{
      //this.nom= data.data.nom;      
      /*this.prenom= data.data.prenom;
      this.imageProfil= data.data.image;
      this.humeurActuelle= data.data.humeur;*/
      
      this.nom= localStorage.getItem("nom");
      this.prenom= localStorage.getItem("prenom");
      this.imageProfil= localStorage.getItem("image");
      this.humeurActuelle= localStorage.getItem("humeur");
      //this.bandeau.bandeauInfo = "Bienvenue sur votre profil "+this.nom+" ! ";
    }
    )
  }


}
