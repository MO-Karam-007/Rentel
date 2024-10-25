import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../components/pagination/pagination.component';


@Component({
  selector: 'app-your-items',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, PaginationComponent],
  templateUrl: './your-items.component.html',
  styleUrl: './your-items.component.scss'
})
export class YourItemsComponent implements OnInit {
  isLoading: boolean = true; // Flag for loading state
  cars: any[];
  totalItems: number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 1;

  constructor(private itemService: ItemService, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.getitems();
  }



  onPageChange(page: number) {
    this.currentPage = page;
    this.getitems();
  }


  getitems() {

    const token = this.itemService.getToken();

    this.itemService.myItems(token, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.cars = data['data'].data;
        this.totalItems = data['data']['total'];
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user data', error);
        this.isLoading = false; // Set loading to false when data is received
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
