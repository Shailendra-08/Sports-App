import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { League } from '../../services/dennis_service';


@Component({
  selector: 'app-league-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dennis1-component.html',
  styleUrls: ['./dennis1-component.scss']
})
export class LeagueCardComponent {
  @Input() league!: League;
  @Input() showViewDetails: boolean = false;
  @Output() toggleFavorite = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<League>();

  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.league.id);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.league);
  }

  getBadgeText(): string {
    if (this.league.badge === 'premier-league') return 'EPL';
    if (this.league.badge === 'efl') return 'EFL';
    if (this.league.badge === 'btcc') return 'BTCC';
    if (this.league.badge === 'british-gt') return 'BGT';
    if (this.league.badge === 'rugby') return 'RUGBY';
    if (this.league.badge === 'super-league') return 'SL';
    if (this.league.badge === 'cricket') return 'CC';
    if (this.league.badge === 'nhl') return 'NHL';
    if (this.league.badge === 'la-liga') return 'LL';
    
    return this.league.name.substring(0, 3).toUpperCase();
  }
}