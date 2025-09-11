import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = 'http://localhost:8080/api/gemini/ask'; // Change to https:// if you fix SSL

  constructor(private http: HttpClient) {}

  askQuestion(prompt: string): Observable<any> {
    const token = localStorage.getItem('sporthub_token') || ''; // Get token

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { prompt };
    console.log(body);
    

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
