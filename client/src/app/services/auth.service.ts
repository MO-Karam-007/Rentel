import { Injectable } from '@angular/core';
import { env } from '../app.config'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = env.baseUrl;

  // token: string = localStorage.getItem('token');
  // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  constructor(private http: HttpClient) { }

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, credentials)
  }

  currentUser(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/current-user`, { headers })
  }

  getProtectedData() {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('localhost:8000/api/protected', { headers });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials)

  }

  loginWithGoogle() {
      window.location.href = 'localhost:8000/oauth/google/redirect';
  }

  completeProfile(data: any, token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.baseUrl}/complete-data`, data, { headers })
  }

  logout(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers })
  }
}
