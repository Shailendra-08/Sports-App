import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-favorites-modal',
  imports: [MatIconModule, CommonModule, MatDialogModule],
  templateUrl: './favorites-modal.html',
  styleUrl: './favorites-modal.css'
})
export class FavoritesModal {

  // temporary:- Will change this to the leagues we get from the backend db. (yash)
  leagues = [   
    { name: 'Premier League', country: 'England' },
    { name: 'La Liga', country: 'Spain' },
    { name: 'Serie A', country: 'Italy' },
    { name: 'Bundesliga', country: 'Germany' },
    { name: 'Ligue 1', country: 'France' }
  ];

  // temporary:- will change the logic after we connect to the backend db. (yash)
  removeLeague(leagueToRemove: { name: string; country: string }) {
    this.leagues = this.leagues.filter(league => league.name !== leagueToRemove.name);
  }

}
