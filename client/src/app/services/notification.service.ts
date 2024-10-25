import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }


  getToken(): string {
    return localStorage.getItem('token') || '';  // Retrieve token from localStorage
  }

  // Add other methods for interacting with localStorage, like setToken, removeToken, etc.
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Set token in localStorage
  }
  // Method to fetch notifications
  getNotifications(token: string): Observable<any> {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Replace with actual token
    };
    return this.http.get('http://localhost:8000/api/notifications', { headers });
  }



  getNotificationCount(token: string): Observable<{ count: number }> {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Replace with actual token
    };

    return this.http.get<{ count: number }>('http://localhost:8000/api/notifications/count', { headers });
    // return this.http.get<number>(`${this.baseUrl}/notifications/count`);
  }

  markNotificationAsRead(id: number,token:string): Observable<any> {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Correctly formatted token
    };

    // Use backticks for template literal syntax
    const url = `http://localhost:8000/api/notifications/${id}/read`;

    // Make sure to pass the headers in the right way
    return this.http.post(url, {}, { headers }); // Empty body for a POST request to mark as read
  }




}
