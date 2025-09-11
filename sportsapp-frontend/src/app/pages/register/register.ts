import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { AppService } from '../../services/app';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  formData = {
    fullName: '',
    email: '',
    password: '',
    age: 0,
    bio: '',
    confirmPassword: ''
  };

  showPassword = false;
  showConfirmPassword = false;
  error = '';
  isLoading = false;

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  onInputChange(): void {
    this.error = '';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.error = '';

    // Frontend validations
    if (!this.formData.fullName || this.formData.fullName.trim().length < 3) {
      this.error = 'Full name must be at least 3 characters long.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.formData.email)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    if (this.formData.age < 13 || this.formData.age > 120) {
      this.error = 'Age must be between 13 and 120.';
      return;
    }

    if (this.formData.password.length < 6) {
      this.error = 'Password must be at least 6 characters long.';
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    // All good, proceed
    this.isLoading = true;

    this.appService.register({
      fullName: this.formData.fullName.trim(),
      email: this.formData.email.trim(),
      password: this.formData.password,
      bio: this.formData.bio.trim(),
      age: this.formData.age
    }).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/home']);
        } else {
          this.error = 'Registration failed.';
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Username or email already exists.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}