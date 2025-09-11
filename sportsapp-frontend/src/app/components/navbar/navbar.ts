import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FavoritesModal } from '../favorites-modal/favorites-modal';
import { ProfileModal } from '../profile-modal/profile-modal';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from '../../services/theme';
import { LucideAngularModule } from "lucide-angular";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, RouterModule, LucideAngularModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  currentUrl = '';
  // themeService: any;

  constructor(private dialog: MatDialog, public router: Router, public themeService: ThemeService ) {
    this.currentUrl = this.router.url; // ✅ initialize immediately

    // ✅ update on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  openLeaguesModal() {
    this.dialog.open(FavoritesModal, {
      position: { top: '60px', right: '20px' },
      width: '300px'
    });
  }

  openProfileModal() {
    this.dialog.open(ProfileModal, {
      position: { top: '60px', right: '0px' },
      width: '50px'
    });
  }

 get isAuthPage(): boolean {
  return (this.currentUrl === '/' || this.currentUrl.includes('/login') || this.currentUrl.includes('/register'));
}

  // get isLoginPage(): boolean {
  //   return this.currentUrl.includes('/login');
  // }

  // get isRegisterPage(): boolean {
  //   return this.currentUrl.includes('/register');
  // }

   toggleTheme() {
    this.themeService.toggleTheme();
  }
}
