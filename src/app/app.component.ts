import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BannerType } from './BannerType'
import { AuthentificationService } from './services/authentification.service';
import { BandeauComponent } from './bandeau/bandeau.component';
import { AlertService } from './services/alert.service';
import { BandeauService } from './services/bandeau.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CeriGame';
  isAuth = false;
  classe = 'alert alert-info';
  auth : AuthentificationService;
  username !:string;
  bandeau: BandeauService;
  /*messageError = 'Une erreur est survenue';
  messageSuccess = 'Opération réussie !';
  messageLogin = 'Bienvenue sur la page d accueil, veuillez vous identifier';*/
  /*bandeauInfo !: string;
  auth : AuthentificationService;
  bannerType !: BannerType;*/


  constructor(_auth : AuthentificationService, _http: HttpClient,private alertService: AlertService,_bandeau : BandeauService){
    this.auth=_auth;
    this.bandeau=_bandeau;
  }

  onMessageOutBandeau = function(data : string) : void {
    alert(data);
    };

  /*banner(type : BannerType, msg : string) {
    this.bandeauInfo = msg;
    this.bannerType = type;
  }*/

 }

