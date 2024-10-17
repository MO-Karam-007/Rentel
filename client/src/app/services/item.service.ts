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
  getItems(latitude: number, longitude: number, max: number): Observable<any> {
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
    // .set('max', max.toString());

    return this.http.get<any>(`${this.baseUrl}`, { params });
  }

  items(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/items`, { headers })
  }

  createItem(data: any, token: string) {
   
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.post(`${this.baseUrl}/items`, data, { headers })



  }

}
