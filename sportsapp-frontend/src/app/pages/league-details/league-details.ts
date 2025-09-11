import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LeaguesService } from '../../services/leagues';
import { LeagueData, Language } from '../../models/league';

@Component({
  selector: 'app-league-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './league-details.html',
  styleUrls: ['./league-details.scss']
})
export class LeagueDetailsComponent implements OnInit {
  leagueData!: LeagueData;
  currentImageIndex = signal<number>(0);
  selectedLanguage = signal<string>('EN');

  languages: Language[] = [
    { code: 'EN', name: 'English', flag: '🇬🇧', descriptionKey: 'strDescriptionEN' },
    { code: 'DE', name: 'German', flag: '🇩🇪', descriptionKey: 'strDescriptionDE' },
    { code: 'FR', name: 'French', flag: '🇫🇷', descriptionKey: 'strDescriptionFR' },
    { code: 'IT', name: 'Italian', flag: '🇮🇹', descriptionKey: 'strDescriptionIT' },
    { code: 'CN', name: 'Chinese', flag: '🇨🇳', descriptionKey: 'strDescriptionCN' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leagueService: LeaguesService
  ) {}

  ngOnInit(): void {
    const leagueId = this.route.snapshot.paramMap.get('id');
    if (leagueId) {
      this.leagueService.getLeagueById(leagueId).subscribe({
        next: (data: LeagueData) => {
          this.leagueData = data;
        },
        error: () => {
          console.error('Failed to load league data');
          this.router.navigate(['/']);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  selectImage(index: number): void {
    this.currentImageIndex.set(index);
  }

  nextImage(): void {
    const current = this.currentImageIndex();
    const total = this.fanartImages().length;
    this.currentImageIndex.set((current + 1) % total);
  }

  prevImage(): void {
    const current = this.currentImageIndex();
    const total = this.fanartImages().length;
    this.currentImageIndex.set(current === 0 ? total - 1 : current - 1);
  }

  selectLanguage(languageCode: string): void {
    this.selectedLanguage.set(languageCode);
  }

  fanartImages = computed(() => [
    this.leagueData?.strFanart1,
    this.leagueData?.strFanart2,
    this.leagueData?.strFanart3,
    this.leagueData?.strFanart4
  ].filter(Boolean));

  selectedFanart = computed(() => {
    const images = this.fanartImages();
    const index = this.currentImageIndex();
    return images.length > 0 ? images[index] : null;
  });

  currentDescription = computed(() => {
    const lang = this.languages.find(l => l.code === this.selectedLanguage());
    if (lang && this.leagueData) {
      const fullDescription = (this.leagueData as any)[lang.descriptionKey];
      if (fullDescription && fullDescription.trim()) {
        const words = fullDescription.split(' ');
        return words.length > 50
          ? words.slice(0, 50).join(' ') + '...'
          : fullDescription;
      }

      const fallback = this.leagueData.strDescriptionEN;
      if (fallback && fallback.trim()) {
        const words = fallback.split(' ');
        return words.length > 50
          ? words.slice(0, 50).join(' ') + '...'
          : fallback;
      }

      return 'No description available.';
    }

    return 'Loading...';
  });

  currentLanguageName = computed(() => {
    return this.languages.find(l => l.code === this.selectedLanguage())?.name || 'English';
  });

  socialLinks = computed(() => [
    { name: 'Website', url: this.leagueData?.strWebsite, icon: 'globe' },
    { name: 'Facebook', url: this.leagueData?.strFacebook, icon: 'facebook' },
    { name: 'Instagram', url: this.leagueData?.strInstagram, icon: 'instagram' },
    { name: 'Twitter', url: this.leagueData?.strTwitter, icon: 'twitter' },
    { name: 'YouTube', url: this.leagueData?.strYoutube, icon: 'youtube' }
  ].filter(link => !!link.url));





  onImageError(event: Event, fallbackUrl: string) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = fallbackUrl;
}













}
