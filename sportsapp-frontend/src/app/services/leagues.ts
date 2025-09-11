import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeagueData } from '../models/league';

@Injectable({ providedIn: 'root' })
export class LeaguesService {
  constructor(private http: HttpClient) {
    console.log("inside leagues constructor");
  }

  // fetch all the countries present inside db.
  getAllCountries(): Observable<any> {
    return this.http.get('https://www.thesportsdb.com/api/v1/json/3/all_countries.php');
  }

  getLeaguesByCountry(country: string): Observable<any> {
    console.log("inside api call");
    const token = localStorage.getItem('sporthub_token');
    console.log("Favorite", token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log(token);

    console.log(country);
    

    // const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=${country}`;
    const url = `http://localhost:8080/api/league?country=${country}`;
    // console.log(this.http.get(url, {headers }));

    return this.http.get(url, { headers });
  }

  // fetch a particular league by id.
  getLeagueById(id: number | string): Observable<LeagueData> {
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupleague.php?id=${id}`;
    return this.http.get<any>(url).pipe(
      map(res => res.leagues[0])
    );
  }

  // adds league to favorite.
  addLeagueToFavorites(data: object): Observable<any> {
    const token = localStorage.getItem('sporthub_token');
    console.log("Favorite", token);
    console.log("Favorite", data);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post('http://localhost:8080/api/fav/favorites', data, { headers });
  }

  // Removing from favorites.
  removeLeagueFromFavorites(email: string, leagueId: string): Observable<any> {
    const token = localStorage.getItem('sporthub_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete(`http://localhost:8080/api/fav/favorites/delete?email=${email}&idLeague=${leagueId}`, { headers });  // will add delete endpoint later.
  }

  // Fetch all favorite leagues for a user by email
  getFavoriteLeaguesByEmail(email: string): Observable<any> {
    const token = localStorage.getItem('sporthub_token'); // use correct token key
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `http://localhost:8080/api/fav/favorites/${email}`;
    return this.http.get(url, { headers });
  }
}
