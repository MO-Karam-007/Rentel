import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-rented-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rented-items.component.html',
  styleUrl: './rented-items.component.scss'
})
export class RentedItemsComponent {

  // borrowerRentals: any[] = [
  //   // Sample request data
  //   { item_id: '001', itemName: 'Item A', rental_price: 100, startDate: '01/01/2024', status: 'Pending' },
  // ];

   rentals: any[] = [
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

   

  constructor(private itemService: RentalService) {
    this.getBorrowerRentals();

  }

  getBorrowerRentals(): void {
    const token = localStorage.getItem('token') || '';
    this.itemService.getBorrowerRentals(token).subscribe(
      (data) => {
        console.log(data);
        this.rentals = Array.isArray(data) ? data : [];

      },
      (error) => {
        console.error('Error fetching borrower rentals', error);
      }
    );
  }

}
