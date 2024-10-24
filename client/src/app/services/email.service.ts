import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url = "https://nodemailer-mk-p5rx.vercel.app/"
  constructor(private httpClient: HttpClient) { }



  getToken(): string {
    return localStorage.getItem('token') || '';  // Retrieve token from localStorage
  }

  // Add other methods for interacting with localStorage, like setToken, removeToken, etc.
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Set token in localStorage
  }


  generateOTP(email: string): Observable<any> {
    const reqBody = {
      to: [email, 'karam.hamam95@gmail.com'],
      subject: 'OTP for Sign Up'
    }
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }


    return this.httpClient.post(this.url, reqBody, headers)
      .pipe(
        tap(data => console.log("Email sended successfully : ", data))
      )
  }
}
