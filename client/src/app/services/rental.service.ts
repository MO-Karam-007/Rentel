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

  rentItem(data: any, token: string) {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.post(`${this.baseUrl}/rentals`, data, { headers })

  }

  getBorrowerRentals(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.baseUrl}/myrentels`, { headers });
  }

  // Get rentals for the item owner
  getItemOwnerRentals(token: string): Observable<any> {
    const headers =  { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.baseUrl}/itemrentel-req`, { headers });
  }

  // Approve a rental
  approveRental(rentalId: number, token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.baseUrl}/rentals/${rentalId}/approve`, {}, { headers });
  }

}
