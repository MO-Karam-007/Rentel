import { Component } from '@angular/core';
import { Output, EventEmitter, } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this!
@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.scss'
})
export class MessagesListComponent {
  messages = [
    { name: 'Jan Mayer', time: '12 mins ago', preview: 'We want to invite you...', image: '', isActive: true },
    { name: 'Joe Bartmann', time: '3:40 PM', preview: 'Hey thanks for your interview...', image: '', isActive: false },
  ];
  @Output() messageSelected = new EventEmitter<any>();
  selectMessage(message: any) {
    this.messageSelected.emit(message);
    this.messages.forEach(m => m.isActive = false);
    message.isActive = true;
  }
}