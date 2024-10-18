import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { SupabaseService } from '../../services/supabase.service';
import { catchError } from 'rxjs';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NavbarComponent, SearchComponent, RouterLink],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  cars: any[] = []
  token: string;
  items: any[];


  constructor(private itemService: ItemService, private rentalService: RentalService) {
    // this.token = localStorage.getItem('token');

  }

  ngOnInit(): void {
    // this.itemService.getItems().subscribe((response) => {
    //   console.log(response)
    //   this.cars = response.data; // Adjust as needed based on your API response
    // });
    this.getitems()

  }

  getitems() {
    console.log("This is the get items ");
    const token = localStorage.getItem('token') || '';
    this.itemService.items(token).subscribe(
      (data) => {
        this.cars = data.data; // Store the full list of items
        console.log('Items fetched:', this.cars);


      },
      (error) => {
        console.error('Error fetching items', error);
      }
    );
  }

  onSearchParamsChange(params: { distance: number; term: string }) {
    const token = localStorage.getItem('token') || '';
    
    const { distance, term } = params;
    console.log("params,", params);

    this.itemService.getItems(token, distance, term).subscribe(
      (data) => {
        console.log("Domty", data.data);
        this.cars = data.data; // Store the full list of items
      },
      (error) => {
        console.error('Error fetching items', error);
      }
    )
    // this.

  }

  renting(id: any) {
    const token = localStorage.getItem('token');
    const endDate = this.calculateEndDate();
    const data = {
      item_id: id,
      end_date: endDate
    };


    this.rentalService.rentItem(data, token).subscribe({
      next: (response) => {
        console.log('Rental created successfully', response);
      },
      error: (error) => {
        console.error('Error creating rental', error);
      }
    });

  }
  calculateEndDate(): string {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7); // Example: Rent for 7 days
    return futureDate.toISOString().split('T')[0]; // Return date in 'YYYY-MM-DD' format
  }
}

