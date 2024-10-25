import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalService } from '../services/rental.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../components/pagination/pagination.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, PaginationComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {
  isLoading: boolean = true; // Flag for loading state
  totalItems: number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 1;
  requests: any[];

  ngOnInit(): void {
    this.retriveReentalReqs();
  }

  constructor(private rentalService: RentalService, private toastrService: ToastrService) {
  }


  onPageChange(page: number) {
    this.currentPage = page;
    this.retriveReentalReqs();
  }


  retriveReentalReqs(): void {
    const token = this.rentalService.getToken();
    this.rentalService.getItemOwnerRentals(token, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.requests = data.data.data;
        this.totalItems = data['data']['total']; // Set the total items count

        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching item owner rentals', error);
        this.isLoading = false; // Ensure loading is false on error
      }
    );
  }


  approveRental(id: number) {
    const token = localStorage.getItem('token') || '';
    this.rentalService.approveRental(id, token)
      .subscribe(
        response => {
          console.log('Rental approved successfully', response);
          // Handle success response (e.g., display a success message, update UI)
          this.retriveReentalReqs();

        },
        error => {
          console.error('Error approving rental', error);
          // Handle error response (e.g., show an error message)
        }
      );
  }
}
