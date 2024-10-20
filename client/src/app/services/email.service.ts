import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url = "https://nodemailer-mk-p5rx.vercel.app/"
  constructor(private httpClient: HttpClient) { }



  
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
