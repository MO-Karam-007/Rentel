import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  createPost(postData: { title: string; description: string }): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Include the token here
        'Content-Type': 'application/json'
    });


    return this.http.post<any>(this.apiUrl, postData, { headers });
  }
}