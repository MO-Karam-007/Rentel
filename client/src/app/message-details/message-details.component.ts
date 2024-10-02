import { Component, Input } from '@angular/core';
import { MessageInputComponent } from '../message-input/message-input.component';
import { CommonModule } from '@angular/common'; // Import this!
@Component({
  selector: 'app-message-details',
  standalone: true,
  imports: [MessageInputComponent, CommonModule],
  templateUrl: './message-details.component.html',
  styleUrl: './message-details.component.scss'
})
export class MessageDetailsComponent {
  @Input() activeMessage: any;
  sendMessage(message: string) {
    this.activeMessage.conversation.push({ sender: 'You', text: message });
  }
}