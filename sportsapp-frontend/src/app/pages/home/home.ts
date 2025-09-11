import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { LeaguesService } from '../../services/leagues';
import { LeagueCardComponent } from '../../components/league-card/league-card';
import { RouterModule, Router } from '@angular/router';
import { LeagueData } from '../../models/league';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, LeagueCardComponent, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {

  leagues: any[] = [];
  filteredLeagues: any[] = [];
  searchQuery: string = '';
  selectedSport: string = '';
  selectedCountry: string = '';
  availableCountries: string[] = [];
  loading: boolean = true;
  favoriteLeagueIds: Set<string> = new Set();

  constructor(private leaguesService: LeaguesService, private router: Router) { }

  ngOnInit(): void {

    const email = localStorage.getItem('email');

    if (!email) {
      alert('User not logged in');
      return;
    }

    this.leaguesService.getAllCountries().subscribe({
      next: (res: any) => {
        this.availableCountries = res.countries.map((c: any) => c.name_en).filter(Boolean);
        this.fetchLeaguesByCountry('India');
      },
      error: () => {
        this.availableCountries = [];
      }
    });

    // Fetch user's favorite leagues
    this.leaguesService.getFavoriteLeaguesByEmail(email).subscribe({
      next: (res: any) => {
        const favorites = res || []; // ✅ define favorites from response
        this.favoriteLeagueIds = new Set(favorites.map((l: any) => String(l.idLeague)));
      },
      error: (err) => {
        console.error('Error fetching favorites:', err);
      }
    });


  }



  onCountryChange(): void {
    this.fetchLeaguesByCountry(this.selectedCountry);
  }

  fetchLeaguesByCountry(country: string): void {
    this.loading = true;
    this.leaguesService.getLeaguesByCountry(country).subscribe({
      next: (res: any) => {
        console.log(res);

        this.leagues = res || [];
        console.log(this.leagues);

        this.loading = false;
        this.filterLeagues();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.filterLeagues();
  }

  onSportFilter(): void {
    this.filterLeagues();
  }

  private filterLeagues(): void {
  this.filteredLeagues = this.leagues.filter(l =>
    l.strLeague?.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
    (this.selectedSport === '' || l.strSport === this.selectedSport)
  );
}


  onToggleFavorite(league: any): void {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('User not logged in');
      return;
    }

    const isAlreadyFavorite = this.favoriteLeagueIds.has(league.idLeague);

    if (isAlreadyFavorite) {
      this.leaguesService.removeLeagueFromFavorites(localStorage.getItem('userId')!, league.idLeague).subscribe({
        next: () => {
          this.favoriteLeagueIds.delete(league.idLeague);
        },
        error: (err) => {
          console.error('Error removing from favorites:', err);
          alert('Failed to remove league from favorites.');
        }
      });
    } else {
      const payload = {
        strLeague: league.strLeague   || '',
        strSport: league.strSport  || '',
        strCountry: league.strCountry  || '',
        idLeague: league.idLeague  || '',
        strAlternate: league.strAlternate || '',
        strYoutube: league.strYoutube  || '',
        strWebsite: league.strWebsite  || '',
        strBadge: league.strBadge  || '',
        email
      };

      console.log(payload);
      
      this.leaguesService.addLeagueToFavorites(payload).subscribe({
        next: () => {
          this.favoriteLeagueIds.add(league.idLeague);
        },
        error: (err) => {
          console.error('Error adding to favorites:', err);
          alert('Failed to add league to favorites.');
        }
      });
    }
  }


  onViewDetails(league: any): void {
    this.router.navigate(['/league_details', league.idLeague]);
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedSport = '';
    this.selectedCountry = '';
    this.filteredLeagues = [...this.leagues];
  }



  trackByLeague(index: number, league: LeagueData): string {
    return league.idLeague;
  }

  //  removeFromFavorites(leagueId: string): void {
  //   const email = localStorage.getItem('email');

  //   if (!email) {
  //     alert('User not logged in');
  //     return;
  //   }

  //   this.leaguesService.removeLeagueFromFavorites(email, leagueId).subscribe({
  //     next: () => {
  //       this.leagues = this.leagues.filter(l => l.idLeague !== leagueId);
  //     },
  //     error: (err) => {
  //       console.error('Error removing from favorites:', err);
  //       alert('Failed to remove league from favorites.');
  //     }
  //   });
  // }

}
