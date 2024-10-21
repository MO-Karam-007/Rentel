import { Injectable } from '@angular/core';
import { env } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl = env.baseUrl;
  constructor(private http: HttpClient) {

  }

  getRequests() {
    return this.http.get<any>(`${this.baseUrl}/posts`);
  }
  deleteRequest(id: number, token: string) {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.delete<any>(`${this.baseUrl}/posts/${id}`, { headers })

  }


}
