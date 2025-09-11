import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
  age: string;
}




@Injectable({ providedIn: 'root' })
export class ProfileService {

  constructor(private http: HttpClient) { }


  getUserProfile(): Observable<UserProfile> {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('sporthub_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<UserProfile>(`http://localhost:8080/api/user/getUser/${email}`, { headers });
  }


  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = {
      currentPassword,
      newPassword
    };

    return this.http.post('', body, { headers }); // will add url later.
  }


  updateUserProfile(data: Partial<UserProfile>): Observable<any> {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('sporthub_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    console.log(email);
    console.log(token);
    console.log(data);

    return this.http.patch(`http://localhost:8080/api/user/update/${email}`, data, { headers });
  }

}
