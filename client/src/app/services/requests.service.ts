import { Injectable } from '@angular/core';
import { env } from '../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl = env.baseUrl;
  constructor(private http: HttpClient) {

  }

  getToken(): string {
    return localStorage.getItem('token') || '';  // Retrieve token from localStorage
  }

  // Add other methods for interacting with localStorage, like setToken, removeToken, etc.
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Set token in localStorage
  }
  getRequests(search: string = '', page: number = 1, limit: number = 8) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(`${this.baseUrl}/posts`, { params });
  }
  deleteRequest(id: number, token: string) {
    
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.delete<any>(`${this.baseUrl}/posts/${id}`, { headers })

  }


}
