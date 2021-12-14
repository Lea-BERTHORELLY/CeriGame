import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { BandeauComponent } from './bandeau/bandeau.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfilComponent } from './profil/profil.component';
import { HistoriqueComponent } from './historique/historique.component';
import { QuizzComponent } from './quizz/quizz.component';

import { AuthentificationService } from './services/authentification.service';
import { WebSocketService } from './services/web-socket.service';
import { TopTenService } from './services/top-ten.service';
import { QuizzService } from './services'; 
import { ProfileService } from './services';
import { BandeauService } from './services';
@NgModule({
  declarations: [
    AppComponent,
    BandeauComponent,
    LoginFormComponent,
    AccueilComponent,
    ProfilComponent,
    QuizzComponent,
    HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthentificationService,
    WebSocketService,
    TopTenService,
    QuizzService,
    ProfileService,
    BandeauService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
