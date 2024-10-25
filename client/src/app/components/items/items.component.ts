import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { SupabaseService } from '../../services/supabase.service';
import { catchError } from 'rxjs';
import { RentalService } from '../../services/rental.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../../wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NavbarComponent, SearchComponent, RouterLink, CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  cars: any[] = []
  token: string;
  items: any[];
  wishlist: any[] = [];


  constructor(private itemService: ItemService, private rentalService: RentalService, private _snackBar: MatSnackBar, private wish: WishlistService) {
  }

  ngOnInit(): void {

    this.getitems();
    this.getWishlist();
  }


  sendId(id: number) {
    console.log(id);
    return
  }
  getitems() {
    console.log("This is the get items ");
    const token = localStorage.getItem('token') || '';
    this.itemService.items(token).subscribe(
      (data) => {
        this.cars = data.data; // Store the full list of items
        console.log('Items fetched:', this.cars);


      },
      (error) => {
        console.error('Error fetching items', error);
      }
    );
  }

  onSearchParamsChange(params: { distance: number; term: string }) {
    const token = localStorage.getItem('token') || '';

    const { distance, term } = params;
    console.log("params,", params);

    this.itemService.getItems(token, distance, term).subscribe(
      (data) => {
        console.log("Domty", data.data);
        this.cars = data.data; // Store the full list of items
      },
      (error) => {
        console.error('Error fetching items', error);
      }
    )
    // this.

  }

  renting(id: any) {
    const token = localStorage.getItem('token');
    const endDate = this.calculateEndDate();
    const data = {
      item_id: id,
      end_date: endDate
    };

    this.rentalService.rentItem(data, token).subscribe({
      next: (response) => {
        console.log('Rental created successfully', response);
        this._snackBar.open('Rental created successfully!', 'Close', {
          duration: 3000,  // Toast duration in milliseconds
        });
      },
      error: (error) => {
        console.error('Error creating rental', error);
        this._snackBar.open('Error creating rental. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  calculateEndDate(): string {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7); // Example: Rent for 7 days
    return futureDate.toISOString().split('T')[0]; // Return date in 'YYYY-MM-DD' format
  }

  addwish(itemid: number) {
    const wishitem = {
      item_id: itemid
    };

    this.wish.createWish(wishitem).subscribe({
      next: (response) => {
        console.log('wish done', response);
        this._snackBar.open('Item added to wishlist successfully!', 'Close', {
          duration: 3000,  // Toast duration in milliseconds
        });
      },
      error: (error) => {
        console.error('Error creating wish', error);
        this._snackBar.open('Error wishing. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  deletewish(itemid: number) {
    const wishitem = {
      item_id: itemid
    };

    this.wish.deleteWish(wishitem).subscribe({
      next: (response) => {
        console.log('Wish removed successfully', response);
        this._snackBar.open('Item removed from wishlist!', 'Close', {
          duration: 3000,  // Toast duration in milliseconds
        });
      },
      error: (error) => {
        console.error('Error removing wish', error);
        this._snackBar.open('Error removing item. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    });
  }


  getWishlist(): void {
    const token = this.wish.getToken();
    this.wish.getWishList(token).subscribe(
      (data) => {
        //console.log(data);
        this.wishlist = data.data.data
        console.log(this.wishlist);

      },
      (error) => {
        console.error('Error fetching borrower rentals', error);
      }
    );
  }



  isItemInWishlist(itemId: number): boolean {
    return this.wishlist.some(item => item.id === itemId);
  }

  // Toggle wishlist status for an item
  toggleWishlist(itemId: number) {
    if (this.isItemInWishlist(itemId)) {
      // Remove from wishlist
      this.deletewish(itemId);
      this.getWishlist();

    } else {
      this.addwish(itemId);
      this.getWishlist();


    }
  }


}

