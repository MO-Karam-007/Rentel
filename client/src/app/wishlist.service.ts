import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }


  createWish(wishitem: { item_id: number; }): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Include the token here
        'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://127.0.0.1:8000/api/favorites', wishitem, { headers });

  }

  deleteWish(wishitem: { item_id: number }): Observable<any> {
    const token = localStorage.getItem('token'); // Fetch token from local storage

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Include token authorization
        'Content-Type': 'application/json'   // Content type JSON
    });

    // Send the DELETE request with item_id in the body (in options)
    return this.http.request<any>('DELETE', 'http://127.0.0.1:8000/api/favorites', {
        headers,
        body: wishitem  // Pass wishitem as the request body
    });
}



  getWishList(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set the authorization header
    });

    return this.http.get<any>(`http://127.0.0.1:8000/api/favorites`, { headers });
  }


}
