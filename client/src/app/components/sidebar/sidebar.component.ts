import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userImage: string = ''
  token!: string;
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  constructor(private authService: AuthService, private router: Router) {

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

  signout() {
    localStorage.removeItem('token');

    this.router.navigate(['/']);

    window.location.reload();
  }

}
