import { Injectable } from '@angular/core';
import { env } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }


  categories(): Observable<any> {

    return this.http.get(`${this.baseUrl}/category`)
  }

  category(id: number): Observable<any> {

    return this.http.get(`${this.baseUrl}/category/${id}`)
  }

  addCategory(data: any, token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.post(`${this.baseUrl}/category`, { "category": data }, { headers })
  }


  putCategory(data: any, token: string, id: number): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.put(`${this.baseUrl}/category/${id}`, { "category": data }, { headers })
  }
}
