import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  notifications: any[] = [];  // Holds the notifications
  loading: boolean = true;  // Initially true to show loading spinner
  sanitizedMessage: any; // To hold sanitized HTML
  constructor(private notificationService: NotificationService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchNotifications();
  }

  // Fetch notifications from the API
  fetchNotifications() {
    const token = this.notificationService.getToken();
    this.notificationService.getNotifications(token).subscribe(
      (data) => {
        this.notifications = data;  // Assign response to notifications array
        console.log('Notifications:', this.notifications);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
        this.loading = false;
      }
    );
  }
  getSanitizedMessage(message: string) {
    return this.sanitizer.bypassSecurityTrustHtml(message);
  }
  markAsRead(notificationId: number) {
    const token = this.notificationService.getToken();
    this.notificationService.markNotificationAsRead(notificationId, token).subscribe(
      () => {
        // Find the notification in the array and mark it as read
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.read_at = new Date(); // Or any other method to mark it as read
        }
      },
      (error) => {
        console.error('Error marking notification as read:', error);
      }
    );
  }
}

