import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme';
import { LeaguesService } from '../../services/leagues';
import { ProfileService } from '../../services/profile';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditProfileModal } from '../../components/edit-profile-modal/edit-profile-modal'; // Make sure path is correct

interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
  age: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MatDialogModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  userData: UserProfile = {
    fullName: '',
    email: '',
    bio: '',
    age: ''
  };

  emailNotifications = true;
  autoRefresh = true;

  favoriteCount = 0;
  uniqueSportsCount = 0;
  uniqueCountriesCount = 0;
  totalLeaguesCount = 0;

  constructor(
    public themeService: ThemeService,
    private leaguesService: LeaguesService,
    private profileService: ProfileService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    // this.updateStats(); // Uncomment if needed
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('sporthub_token');
    if (!token) {
      console.warn('No token found in localStorage');
      return;
    }

    this.profileService.getUserProfile().subscribe({
      next: (data: UserProfile) => {
        console.log('User Profile:', data);
        this.userData = data;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      }
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleEmailNotifications(): void {
    this.emailNotifications = !this.emailNotifications;
  }

  toggleAutoRefresh(): void {
    this.autoRefresh = !this.autoRefresh;
  }

  Edit(): void {
    const dialogRef = this.dialog.open(EditProfileModal, {
      width: '400px',
      data: {
        fullName: this.userData.fullName,
        bio: this.userData.bio,
        age: this.userData.age
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userData.fullName = result.fullName;
        this.userData.bio = result.bio;
        this.userData.age = result.age;

        // Optional: Call API to update profile
        // this.profileService.updateUserProfile(this.userData).subscribe({
        //   next: () => console.log('Profile updated successfully'),
        //   error: (err) => console.error('Failed to update profile', err)
        // });

        const updatedData = {
          fullName: result.fullName,
          bio: result.bio,
          age: result.age
        };

        this.profileService.updateUserProfile(updatedData).subscribe({
          next: () => console.log('Profile updated successfully'),
          error: (err) => console.error('Failed to update profile', err)
        });


      }
    });
  }
}
