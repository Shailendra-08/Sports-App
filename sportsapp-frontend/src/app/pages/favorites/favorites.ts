import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LeaguesService } from '../../services/leagues';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LeagueCardComponent } from '../../components/league-card/league-card';
// import { LeagueData } from '../../models/league';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    LucideAngularModule,
    LeagueCardComponent
  ]
})
export class Favorites implements OnInit {
  leagues: any[] = [];

  constructor(private leaguesService: LeaguesService, private router: Router) { }

  ngOnInit(): void {
    const email = localStorage.getItem('email');

    if (!email) {
      alert('User not logged in');
      return;
    }

    this.leaguesService.getFavoriteLeaguesByEmail(email).subscribe({
      next: (res) => {
        console.log('Favorites response:', res);
        this.leagues = res || [];
      },
      error: (err) => {
        console.error('Error fetching favorite leagues:', err);
        alert('Failed to load favorite leagues.');
      }
    });
  }

  goToLeagueDetails(leagueId: string): void {
    this.router.navigate(['/league_details', leagueId]);
  }

  removeFromFavorites(leagueId: string): void {
    const email = localStorage.getItem('email');

    if (!email) {
      alert('User not logged in');
      return;
    }

    this.leaguesService.removeLeagueFromFavorites(email, leagueId).subscribe({
      next: () => {
        this.leagues = this.leagues.filter(l => l.idLeague !== leagueId);
      },
      error: (err) => {
        console.error('Error removing from favorites:', err);
        alert('Failed to remove league from favorites.');
      }
    });
  }
}
