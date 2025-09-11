import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { AppService } from '../../services/app';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  formData = {
    email: '',
    password: ''
  };

  showPassword = false;
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

  onSubmit(): void {
    this.isLoading = true;
    this.error = '';
    console.log(this.formData);

    this.appService.login(this.formData.email, this.formData.password).subscribe({
      next: (response) => {
        // Handle successful login
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Handle error response
        this.error = 'Invalid username or password';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}



