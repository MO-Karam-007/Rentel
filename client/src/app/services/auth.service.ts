import { Injectable } from '@angular/core';
import { env } from '../app.config'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = env.baseUrl;

  // token: string = localStorage.getItem('token');
  // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  constructor(private http: HttpClient) { }


  getToken(): string {
    return localStorage.getItem('token') || '';  // Retrieve token from localStorage
  }

  // Add other methods for interacting with localStorage, like setToken, removeToken, etc.
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Set token in localStorage
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, credentials)
  }

  currentUser(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/current-user`, { headers })
  }
  allUsers(token: string, search: string = '', page: number = 1, limit: number = 3): Observable<any> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/all-users`, { params, headers });
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



  banUser(token: string, id: number): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/ban/${id}`, { headers })
  }

  unbanUser(token: string, id: number): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get(`${this.baseUrl}/unban/${id}`, { headers })
  }
}
