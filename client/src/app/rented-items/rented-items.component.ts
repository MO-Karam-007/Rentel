import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalService } from '../services/rental.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaginationComponent } from '../components/pagination/pagination.component';
@Component({
  selector: 'app-rented-items',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, PaginationComponent],
  templateUrl: './rented-items.component.html',
  styleUrl: './rented-items.component.scss'
})
export class RentedItemsComponent {

  // borrowerRentals: any[] = [
  //   // Sample request data
  //   { item_id: '001', itemName: 'Item A', rental_price: 100, startDate: '01/01/2024', status: 'Pending' },
  // ];
  totalItems: number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 1;

  rentals: any[];
  isLoading: boolean = true; // Flag for loading state


  constructor(private itemService: RentalService, private dialog: MatDialog) {
    this.getBorrowerRentals();

  }


  onPageChange(page: number) {
    this.currentPage = page;
    this.getBorrowerRentals();
  }


  getBorrowerRentals(): void {
    const token = this.itemService.getToken();


    this.itemService.getBorrowerRentals(token).subscribe(
      (data) => {
        // console.log(data);
        this.rentals = data.data.data;
        this.totalItems = data['data']['total'];  // Set loading to false when data is received
        this.isLoading = false;

      },
      (error) => {
        console.error('Error fetching borrower rentals', error);
        this.isLoading = false; // Ensure loading is false on error as well
      }
    );
  }
  openReviewDialog(item_id: Number) {
    const dialogRef = this.dialog.open(ReviewFormComponent, {
      data: { item_id }  // Pass the item_id to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.submitPost(result);
      }
    });

  }
}
