import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LeagueData } from '../../models/league';

@Component({
  selector: 'app-league-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './league-card.html',
  styleUrls: ['./league-card.scss']
})
export class LeagueCardComponent {
  @Input() league!: any;
  @Input() showViewDetails: boolean = false;
  @Input() favoriteLeagueIds: Set<string> = new Set();
  @Input() isFavoritesPage: boolean = false;
  @Input() showDeleteForFavorites: boolean = false;



  @Output() toggleFavorite = new EventEmitter<LeagueData>();
  @Output() viewDetails = new EventEmitter<LeagueData>();
  @Output() remove = new EventEmitter<string>();
  

  onRemoveFavorite(): void {
    this.remove.emit(this.league.idLeague);
  }


  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Favorite IDs:', this.favoriteLeagueIds);
    console.log('Current League ID:', this.league.idLeague);
  }


  onToggleFavorite(): void {
    console.log('Toggling favorite for:', this.league);
console.log('Current favorites:', Array.from(this.favoriteLeagueIds));

    this.toggleFavorite.emit(this.league);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.league);
  }

  getBadgeText(): string {
    return this.league?.strLeague?.charAt(0) || '?';
  }


  isFavorite(): boolean {
    return this.favoriteLeagueIds.has(String(this.league.idLeague));
  }


}
