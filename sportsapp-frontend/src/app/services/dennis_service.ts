import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface League {
  id: number;
  name: string;
  sport: string;
  country: string;
  leagueId: number;
  alternateName?: string;
  youtube?: string;
  website?: string;
  badge: string;
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {
  private favoritesSubject = new BehaviorSubject<League[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  private leaguesData: League[] = [
    {
      id: 1,
      name: 'English Premier League',
      sport: 'Soccer',
      country: 'England',
      leagueId: 4328,
      badge: 'premier-league',
      isFavorite: false
    },
    {
      id: 2,
      name: 'English League Championship',
      sport: 'Soccer',
      country: 'England',
      leagueId: 4329,
      badge: 'efl',
      isFavorite: false
    },
    {
      id: 3,
      name: 'BTCC',
      sport: 'Motorsport',
      country: 'England',
      leagueId: 4330,
      badge: 'btcc',
      isFavorite: false
    },
    {
      id: 4,
      name: 'English League 1',
      sport: 'Soccer',
      country: 'England',
      leagueId: 4396,
      website: 'www.efl.com/competitions/efl-league-one',
      badge: 'efl',
      isFavorite: false
    },
    {
      id: 5,
      name: 'English League 2',
      sport: 'Soccer',
      country: 'England',
      leagueId: 4397,
      website: 'www.efl.com/clubs-and-competitions/sky-bet-league-two',
      badge: 'efl',
      isFavorite: false
    },
    {
      id: 6,
      name: 'British GT Championship',
      sport: 'Motorsport',
      country: 'England',
      leagueId: 4410,
      youtube: 'www.youtube.com/user/BritishGT',
      website: 'www.britishgt.com',
      badge: 'british-gt',
      isFavorite: false
    },
    {
      id: 7,
      name: 'English Prem Rugby',
      sport: 'Rugby',
      country: 'England',
      leagueId: 4411,
      badge: 'rugby',
      isFavorite: false
    },
    {
      id: 8,
      name: 'English Rugby League Super League',
      sport: 'Rugby',
      country: 'England',
      leagueId: 4412,
      badge: 'super-league',
      isFavorite: false
    },
    {
      id: 9,
      name: 'English County Championship Division 1',
      sport: 'Cricket',
      country: 'England',
      leagueId: 4413,
      badge: 'cricket',
      isFavorite: false
    },
    {
      id: 10,
      name: 'NHL (National Hockey League)',
      sport: 'Ice Hockey',
      country: 'United States',
      leagueId: 4380,
      alternateName: 'National Hockey League',
      youtube: 'www.youtube.com/NHL',
      website: 'www.nhl.com',
      badge: 'nhl',
      isFavorite: true
    },
    {
      id: 11,
      name: 'La Liga',
      sport: 'Football',
      country: 'Spain',
      leagueId: 4335,
      alternateName: 'Primera División',
      youtube: 'www.youtube.com/laliga',
      website: 'www.laliga.com',
      badge: 'la-liga',
      isFavorite: true
    }
  ];

  constructor() {
    this.updateFavorites();
  }

  getAllLeagues(): League[] {
    return [...this.leaguesData];
  }

  getFavoriteLeagues(): League[] {
    return this.leaguesData.filter(league => league.isFavorite);
  }

  toggleFavorite(leagueId: number): void {
    const league = this.leaguesData.find(l => l.id === leagueId);
    if (league) {
      league.isFavorite = !league.isFavorite;
      this.updateFavorites();
    }
  }

  searchLeagues(query: string, sport?: string): League[] {
    let filtered = this.leaguesData;
    
    if (sport && sport !== 'All Sports') {
      filtered = filtered.filter(league => league.sport === sport);
    }
    
    if (query) {
      filtered = filtered.filter(league => 
        league.name.toLowerCase().includes(query.toLowerCase()) ||
        league.sport.toLowerCase().includes(query.toLowerCase()) ||
        league.country.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return filtered;
  }

  getSports(): string[] {
    const sports = Array.from(new Set(this.leaguesData.map(league => league.sport)));
    return ['All Sports', ...sports.sort()];
  }

  private updateFavorites(): void {
    this.favoritesSubject.next(this.getFavoriteLeagues());
  }
}