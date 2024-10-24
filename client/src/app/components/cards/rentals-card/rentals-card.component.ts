import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../../services/rental.service';
import { DatePipe } from '@angular/common';
import { PaginationComponent } from '../../pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-rentals-card',
  standalone: true,
  imports: [DatePipe, PaginationComponent, FormsModule, LoadingComponent],
  templateUrl: './rentals-card.component.html',
  styleUrl: './rentals-card.component.scss'
})
export class RentalsCardComponent implements OnInit {
  rentalList: any[];
  searchQuery: string = '';
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  status: string = '';


  constructor(private rentalService: RentalService) {
  }

  ngOnInit(): void {
    this.rentals(this.searchQuery, this.status)
  }

  search() {
    this.currentPage = 1; // Reset to first page when searching
    this.rentals(this.searchQuery, this.status);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.rentals(this.searchQuery, this.status);
  }


  rentals(query: string, status: string) {

    const token = this.rentalService.getToken()


    this.rentalService.rentals(token, query, status, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.rentalList = data.data.data
        this.totalItems = data['data']['total']; // Set the total items count

      })
  }

}
