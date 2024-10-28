import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { env } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://127.0.0.1:8000/api/review';
  private baseUrl = env.baseUrl;

  constructor(private http: HttpClient) { }


  getItemReviews(itemId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
  
    // Check if token exists
    if (!token) {
      return throwError('No authentication token found.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Set the authorization header
      'Content-Type': 'application/json'  // Optional: Set content type
    });
  
    return this.http.get<any>(`http://127.0.0.1:8000/api/item/${itemId}/reviews`, { headers })
      .pipe(
        catchError((error) => {
          // Handle error response
          console.error('Error fetching item reviews:', error);
          return throwError('Failed to fetch item reviews. Please try again later.');
        })
      );
  }
  

  createReview(reviewData: { reviewed_id: number; rating: number; comment: string }): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Include the token here
      'Content-Type': 'application/json'
    });


    return this.http.post<any>('http://127.0.0.1:8000/api/review', reviewData, { headers });
  }

  getReviews() {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };


    return this.http.get<any>(`${this.baseUrl}/review`, { headers });
  }
}
