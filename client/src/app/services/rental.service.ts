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

}
