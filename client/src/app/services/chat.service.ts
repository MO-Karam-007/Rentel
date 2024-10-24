import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';
import { env } from '../app.config'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = env.baseUrl;

  private pusher: Pusher;

  constructor(private http: HttpClient) {
    this.pusher = new Pusher('271b56aa120d3caef8b9', {
      cluster: 'eu',
    });
  }


  getToken(): string {
    return localStorage.getItem('token') || '';  // Retrieve token from localStorage
  }

  // Add other methods for interacting with localStorage, like setToken, removeToken, etc.
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Set token in localStorage
  }
  public subscribeToChannel(channelName: string, callback: Function) {
    const channel = this.pusher.subscribe(channelName);
    channel.bind('MessageSent', callback);
  }

  sendMessage(message: string) {
    this.http.post(`${this.baseUrl}/messages`, { message }).subscribe();
  }

}
