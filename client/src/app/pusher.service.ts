import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private pusher: Pusher;
  private channel: any;

  constructor() {
    this.pusher = new Pusher('your_app_key', {
      cluster: 'your_cluster',
    //  encrypted: true,
    });

    this.channel = this.pusher.subscribe('chat-channel');
  }

  // Method to listen for messages
  listenForMessages(callback: (data: any) => void) {
    this.channel.bind('App\\Events\\MessageSent', (data: any) => {
      callback(data);
    });
  }
}
