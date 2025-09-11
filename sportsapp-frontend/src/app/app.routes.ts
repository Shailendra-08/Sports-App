import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Favorites } from './pages/favorites/favorites';
import { Profile } from './pages/profile/profile';
import { Login } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { LeagueDetailsComponent } from './pages/league-details/league-details';
import { LeagueCardComponent } from './pages/dennis1-component/dennis1-component';
import { AiSearchComponent } from './pages/ai-search/ai-search';
import { LandingComponent } from './pages/landing/landing';




export const routes: Routes = [
  {path: '', component: LandingComponent},
  { path: 'login', component: Login },
  { path: 'favorites', component: Favorites },
  { path: 'profile', component: Profile },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: Login },
  {path: 'home', component: Home},
  {path: 'ai-search', component: AiSearchComponent},
  {path: 'league_details/:id', component: LeagueDetailsComponent },
  {path: 'dennis', component: LeagueCardComponent},
  { path: '**', redirectTo: '' } 
  // fallback route
];
