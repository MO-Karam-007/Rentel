import { Injectable } from '@angular/core';
import { env } from '../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token') || '';  // Retrieve token from localStorage
  }

  // Add other methods for interacting with localStorage, like setToken, removeToken, etc.
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Set token in localStorage
  }

  rentItem(data: any, token: string) {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.post(`${this.baseUrl}/rentals`, data, { headers })

  }

  getBorrowerRentals(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.baseUrl}/myrentels`, { headers });
  }

  // Get rentals for the item owner
  getItemOwnerRentals(token: string, page: number = 1, limit: number = 5): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.baseUrl}/itemrentel-req`, { headers, params });
  }


  rentals(token: string, search: string = '', status: string = '', page: number = 1, limit: number = 5): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }
    if (status) {
      params = params.set('status', status);
    }

    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.baseUrl}/rentals`, { params, headers });
  }

  // Approve a rental
  approveRental(rentalId: number, token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.baseUrl}/rentals/${rentalId}/approve`, {}, { headers });
  }

}
