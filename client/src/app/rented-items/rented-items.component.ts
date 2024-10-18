import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rented-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rented-items.component.html',
  styleUrl: './rented-items.component.scss'
})
export class RentedItemsComponent {

  cars: any[] = [
    // Sample request data
    { refNumber: '001', itemName: 'Item A', price: 100, startDate: '01/01/2024', status: 'Pending' },
    { refNumber: '002', itemName: 'Item B', price: 150, startDate: '02/01/2024', status: 'Approved' },
  ];
 
  // constructor(private itemService: ItemService) {
  //   this.getitems();

  // }

  // getBorrowerRentals(): void {
  //   const token = localStorage.getItem('token') || '';
  //   this.rentalService.getBorrowerRentals(token).subscribe(
  //     (data) => {
  //       this.borrowerRentals = Array.isArray(data) ? data : [];
  //     },
  //     (error) => {
  //       console.error('Error fetching borrower rentals', error);
  //     }
  //   );
  // }

}
