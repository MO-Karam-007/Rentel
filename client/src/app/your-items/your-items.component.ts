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
    { id: '001', name: 'Item A', price: 100, startDate: '01/01/2024', current_state: 'Pending' },
    { id: '002', name: 'Item B', price: 150, startDate: '02/01/2024', current_state: 'Approved' },
  ];

  constructor(private itemService: ItemService) {
    this.getitems();

  }
  getitems() {
    const token = localStorage.getItem('token') || '';
    this.itemService.myItems(token).subscribe(
      (data) => {
        console.log(data);
        this.cars = Array.isArray(data) ? data : []
        // this.userImage = `localhost:8000/storage/` + profile.profile_picture; // Adjust based on your API response
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );

  }

  deleteItem(id: number) {
    const token = localStorage.getItem('token') || '';
  
    this.itemService.deleteItem(id, token).subscribe(
      () => {
        console.log(`Item with ID ${id} deleted successfully.`);
        this.getitems(); // Refresh the list after deletion
      },
      (error) => {
        console.error(`Error deleting item with ID ${id}`, error);
      }
    );
  }

  deleteRequest(index: number) {
    // Remove the request at the specified index
    this.cars.splice(index, 1);
  }
}
