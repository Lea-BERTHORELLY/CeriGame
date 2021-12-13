import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';
import { BandeauService } from './services/bandeau.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuth = false;
  auth : AuthentificationService;
  bandeau: BandeauService;


  constructor(_auth : AuthentificationService, _http: HttpClient,_bandeau : BandeauService){
    this.auth=_auth;
    this.bandeau=_bandeau;
  }

  onMessageOutBandeau = function(data : string) : void {
    alert(data);
  };

 }

