import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {
  
  requests: any[] = [
    {
        borrower_id: 11,
        created_at: "2024-10-18T20:29:40.000000Z",
        end_date: "2024-12-31T00:00:00.000000Z",
        id: 1,
        item: { id: 2, name: 'item', description: 'nmfffmfm', item_image: 'images/item.jpg', latitude: '30.0588000' },
        item_id: 2,
        rental_price: "10.00",
        start_date: "2024-10-18T00:00:00.000000Z",
        status: "requested"
    },
];

  constructor(private rentalService: RentalService) {
    this.getItemOwnerRentals();

  }

  // Fetch item owner rentals
  getItemOwnerRentals(): void {
    const token = localStorage.getItem('token') || '';
    this.rentalService.getItemOwnerRentals(token).subscribe(
      (data) => {
        console.log(data);
        this.requests = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error fetching item owner rentals', error);
      }
    );
  }


  approveRental(id: number) {
    const token = localStorage.getItem('token') || '';
    this.rentalService.approveRental(id,token)
      .subscribe(
        response => {
          console.log('Rental approved successfully', response);
          // Handle success response (e.g., display a success message, update UI)
        },
        error => {
          console.error('Error approving rental', error);
          // Handle error response (e.g., show an error message)
        }
      );
  }
}
