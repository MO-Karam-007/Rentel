import { Component } from '@angular/core';
import { MessagesListComponent } from '../messages-list/messages-list.component';
import { MessageDetailsComponent } from '../message-details/message-details.component';
@Component({
  selector: 'app-message-main',
  standalone: true,
  imports: [MessagesListComponent, MessageDetailsComponent],
  templateUrl: './message-main.component.html',
  styleUrl: './message-main.component.scss'
})
export class MessageMainComponent {
  selectedMessage: any;
  onMessageSelected(message: any) {
    this.selectedMessage = message;
  }
}