import { Component } from '@angular/core';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-your-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './your-items.component.html',
  styleUrl: './your-items.component.scss'
})
export class YourItemsComponent {
  cars: any[] = [
    // Sample request data
    { refNumber: '001', itemName: 'Item A', price: 100, startDate: '01/01/2024', status: 'Pending' },
    { refNumber: '002', itemName: 'Item B', price: 150, startDate: '02/01/2024', status: 'Approved' },
  ];

  // constructor(private itemService: ItemService) {
  //   this.getitems();

  // }
  // getitems() {
  //   const token = localStorage.getItem('token') || '';
  //   this.itemService.myItems(token).subscribe(
  //     (data) => {
  //       // console.log(data);
  //       this.cars = Array.isArray(data) ? data : []
  //       // this.userImage = `localhost:8000/storage/` + profile.profile_picture; // Adjust based on your API response
  //     },
  //     (error) => {
  //       console.error('Error fetching user data', error);
  //     }
  //   );

  // }

  deleteRequest(index: number) {
    // Remove the request at the specified index
    this.cars.splice(index, 1);
  }
}
