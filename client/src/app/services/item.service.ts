import { Injectable } from '@angular/core';
import { env } from '../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token') || '';  // Retrieve token from localStorage
  }

  // Add other methods for interacting with localStorage, like setToken, removeToken, etc.
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Set token in localStorage
  }

  getItem(id: number) {
    return this.http.get<any>(`${this.baseUrl}/items/${id}`);
  }
  getItems(token: string, maxDistance: number = 7, searchTerm: string = ''): Observable<any> {

    let params = new HttpParams()
      .set('maxDistance', maxDistance.toString())
      .set('search', searchTerm);
    console.log(searchTerm);

    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get<any>(`${this.baseUrl}/items`, { params, headers });
  }

  items(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/items`, { headers })
  }

  createItem(data: any, token: string) {

    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.post(`${this.baseUrl}/items`, data, { headers })
  }

  myItems(token: string, page: number = 1, limit: number = 4) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/my-items`, { headers, params })
  }
  myItemsloc(token: string) {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/items-pins`, { headers })
  }


  allItems(token: string, search: string = '', page: number = 1, limit: number = 4) {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/all-items`, { headers, params })
  }
  deleteItem(id: number, token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.delete(`${this.baseUrl}/items/${id}`, { headers });
  }

  publishItem(id: number, token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get<any>(`${this.baseUrl}/publish-item/${id}`, { headers });
  }

}
