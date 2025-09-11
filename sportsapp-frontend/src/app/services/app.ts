import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, RegisterRequest, LoginRequest } from '../models/user';

interface LoginResponse {
  token: string;
  user: User;
  message?: string;
}

interface RegisterResponse {
  token: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly API_URL = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.loadUserFromToken(token);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const loginData: LoginRequest = { email, password };

    return this.http.post<LoginResponse>(`http://localhost:8080/api/auth/login`, loginData)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('sporthub_token', response.token);
            this.loadUserFromToken(response.token);
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  register(registerData: RegisterRequest): Observable<boolean> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, registerData)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('sporthub_token', response.token);
            this.loadUserFromToken(response.token);
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.http.post(`${this.API_URL}/logout`, {}).pipe(
      catchError(error => {
        console.error('Logout error:', error);
        return throwError(() => error);
      })
    ).subscribe();

    localStorage.removeItem('sporthub_token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('sporthub_token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUserEmail(): string | null {
    return this.getCurrentUser()?.email || null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error parsing token:', error);
      return true;
    }
  }

  private loadUserFromToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user: User = {
        id: payload.userId || payload.sub,
        fullName: payload.fullName || payload.name || '',
        email: payload.email || '',
        username: payload.username
      };
      console.log(user);
      localStorage.setItem('email', user.id);
      console.log(localStorage.getItem('email'));
      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('sporthub_token');
    }
  }

  refreshToken(): Observable<boolean> {
    const currentToken = this.getToken();
    if (!currentToken) {
      return throwError(() => new Error('No token available'));
    }

    return this.http.post<LoginResponse>(`${this.API_URL}/refresh`, { token: currentToken })
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('sporthub_token', response.token);
            this.loadUserFromToken(response.token);
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Token refresh error:', error);
          this.logout();
          return throwError(() => error);
        })
      );
  }
}
