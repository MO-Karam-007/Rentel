import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service'; 


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userImage: string ;
  // @Input() bg: string = 'bg-black';
  token!: string;
  notificationCount: number = 0;
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  constructor(private authService: AuthService ,private notificationService: NotificationService) {

    if (this.token) {
      console.log(this.token);
      this.getUser();  // Fetch user data if token exists

  
    }

  }
  ngOnInit(): void {
    // Ensure this only runs in the browser environment
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      // Retrieve the token from localStorage
      this.token = localStorage.getItem('token');

      // Log the token to check if it's retrieved correctly
      console.log('Token retrieved from localStorage:', this.token);

      // If the token exists, fetch the user data
      if (this.token) {
        this.getUser();  // Call getUser() only if the token exists
      } else {
        console.error('No token found.');
      }
    }

    this.fetchNotificationCount();
  }


  getUser() {
    this.authService.currentUser(this.token).subscribe(
      (data) => {
        this.userImage = data.data.message.profile_picture
        // this.userImage = `localhost:8000/storage/` + profile.profile_picture; // Adjust based on your API response
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  fetchNotificationCount() {
    this.notificationService.getNotificationCount().subscribe(
      (response) => {
        this.notificationCount = response.count; // Assuming the response has the count
      },
      (error) => {
        console.error('Error fetching notification count:', error);
      }
    );
  }


}
