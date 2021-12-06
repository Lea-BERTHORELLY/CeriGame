import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { BandeauComponent } from '../bandeau/bandeau.component';
import { BandeauService } from '../services/bandeau.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  
  //@Input() userObj = { username: '', password: '' }
  @Input() username: any;
  @Input() password:any;
  isLogged:any;
  auth:AuthentificationService;
  router: Router;
  bandeau : BandeauService;
  constructor( _auth : AuthentificationService, _router : Router, _bandeau : BandeauService) { 
    this.auth=_auth;
    this.router=_router;
    this.bandeau=_bandeau;
  }

  ngOnInit(): void {
    this.bandeau.bandeauInfo = "Bienvenue , veuillez vous connecter";
   }
  
  login(formConnex: any) {
    this.auth.VerifyId(formConnex.form.value.username, formConnex.form.value.password).subscribe(
      (data: any) => { 
        if(formConnex.form.value.username!=null && formConnex.form.value.password!=null){
          if(localStorage.getItem("date")){
            this.bandeau.bandeauInfo = "Bienvenue " + formConnex.form.value.username+" votre dernière connexion remonte au "+localStorage.getItem("date") + " à "+ localStorage.getItem("time");
            localStorage.setItem("date",new Date().toDateString());
            localStorage.setItem("time",new Date().toTimeString());
          }            
          else{
            this.bandeau.bandeauInfo = "Bienvenue " + formConnex.form.value.username;
            localStorage.setItem("date",new Date().toDateString());
            localStorage.setItem("time",new Date().toTimeString());
          }
          this.router.navigate(['accueil']);
        }
        else {
          this.bandeau.bandeauInfo = "Erreur";
        }
      },
      ( error: any) => {
      }
    );
  }

}
