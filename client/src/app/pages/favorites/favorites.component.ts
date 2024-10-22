import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RentalService } from '../../services/rental.service';
import { WishlistService } from '../../wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  wishlist: any[] = [];
  isLoading: boolean = true; // Flag for loading state
  totalItems: number = 0;  // Total count for displaying in the table footer
  constructor(private authService: AuthService ,private wishervice: WishlistService ) {}
  ngOnInit(): void {
   
    this.getWishlist
    ();  // Call getUser() only if the token exists
    
}


getWishlist(): void {
  this.wishervice.getWishList().subscribe(
    (data) => {
      console.log(data);
      this.wishlist = Array.isArray(data) ? data : [];
      this.totalItems = this.wishlist.length;  // Update total count
      this.isLoading = false;  // Set loading to false when data is received
    },
    (error) => {
      console.error('Error fetching wishlist items', error);
      this.isLoading = false;  // Ensure loading is false on error as well
    }
  );
}

}
