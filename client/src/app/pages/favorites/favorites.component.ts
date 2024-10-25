import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RentalService } from '../../services/rental.service';
import { WishlistService } from '../../wishlist.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  wishlist: any[] = [];
  isLoading: boolean = true; // Flag for loading state
  totalItems: number = 0;  // Total count for displaying in the table footer
  itemsPerPage: number = 10;
  currentPage: number = 1;
  constructor(private authService: AuthService, private wishervice: WishlistService) { }
  ngOnInit(): void {

    this.getWishlist();

  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getWishlist();
  }

  getWishlist(): void {
    const token = this.wishervice.getToken();
    this.wishervice.getWishList(token, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.wishlist = data.data.data
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
