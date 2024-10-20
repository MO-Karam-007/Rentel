import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { CommonModule } from '@angular/common';

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
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  // Fetch notifications from the API
  fetchNotifications() {
    this.notificationService.getNotifications().subscribe(
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

  markAsRead(notificationId: number) {
    this.notificationService.markNotificationAsRead(notificationId).subscribe(
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

