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
}
