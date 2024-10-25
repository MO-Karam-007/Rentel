import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token') || '';  // Retrieve token from localStorage
  }

  // Add other methods for interacting with localStorage, like setToken, removeToken, etc.
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Set token in localStorage
  }


  createWish(wishitem: { item_id: number; }): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Include the token here
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/favorites`, wishitem, { headers });

  }

  deleteWish(wishitem: { item_id: number }): Observable<any> {
    const token = localStorage.getItem('token'); // Fetch token from local storage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Include token authorization
      'Content-Type': 'application/json'   // Content type JSON
    });

    // Send the DELETE request with item_id in the body (in options)
    return this.http.request<any>('DELETE', `${this.baseUrl}/favorites`, {
      headers,
      body: wishitem  // Pass wishitem as the request body
    });
  }



  getWishList(token: string, page: number = 1, limit: number = 5): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set the authorization header
    });
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.baseUrl}/favorites`, { headers, params });
  }


}
