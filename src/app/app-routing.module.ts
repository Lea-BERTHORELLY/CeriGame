import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BandeauComponent } from './bandeau/bandeau.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfilComponent} from './profil/profil.component';
import { QuizzComponent } from './quizz/quizz.component';


const routes: Routes = [
  { path: '', pathMatch: 'full' , component: LoginFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'profile', component: ProfilComponent },
  { path: 'quizz', component: QuizzComponent },
  { path: '**', component: AccueilComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
