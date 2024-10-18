import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {
  cars: any[] = [
    // Sample request data
    { refNumber: '001', itemName: 'Item A', price: 100, startDate: '01/01/2024', status: 'Pending' },
    { refNumber: '002', itemName: 'Item B', price: 150, startDate: '02/01/2024', status: 'Approved' },
  ];

  // constructor(private itemService: ItemService) {
  //   this.getitems();

  // }

  // Fetch item owner rentals
  // getItemOwnerRentals(): void {
  //   const token = localStorage.getItem('token') || '';
  //   this.rentalService.getItemOwnerRentals(token).subscribe(
  //     (data) => {
  //       this.itemOwnerRentals = Array.isArray(data) ? data : [];
  //     },
  //     (error) => {
  //       console.error('Error fetching item owner rentals', error);
  //     }
  //   );
  // }
}
