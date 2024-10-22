import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RentalService } from '../../services/rental.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userImage: string = ''
  userName: string = ''
  userAdress: string = ''
  userEmail: string = ''
  rentals: any[] = [];
  isLoading: boolean = true; // Flag for loading state

  
  constructor(private authService: AuthService ,private itemService: RentalService ) {}

  ngOnInit(): void {
   
        this.getUser();  // Call getUser() only if the token exists
        this.getBorrowerRentals()
    
  }

  getUser() {
    const token = localStorage.getItem('token') || '';
    this.authService.currentUser(token).subscribe(
      (data) => {
        console.log(data)
        this.userImage = data.data.message.profile_picture
        this.userName = data.data.message.first_name
        this.userEmail = data.data.message.email
        this.userAdress = data.data.message.address

        console.log(this.userImage)
        this.isLoading = false; // Ensure loading is false on error as well


      },
      (error) => {
        console.error('Error fetching user data', error);
        this.isLoading = false; // Ensure loading is false on error as well

      }
    );
  }

  getBorrowerRentals(): void {
    const token = localStorage.getItem('token') || '';
    this.itemService.getBorrowerRentals(token).subscribe(
      (data) => {
        console.log(data);
        this.rentals = Array.isArray(data) ? data : [];
        this.isLoading = false; // Set loading to false when data is received
      },
      (error) => {
        console.error('Error fetching borrower rentals', error);
        this.isLoading = false; // Ensure loading is false on error as well
      }
    );
  }

}
