import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this!
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
  messageText = '';
  @Output() messageSent = new EventEmitter<string>();
  send() {
    if (this.messageText.trim()) {
      this.messageSent.emit(this.messageText);
      this.messageText = '';
    }
  }
}