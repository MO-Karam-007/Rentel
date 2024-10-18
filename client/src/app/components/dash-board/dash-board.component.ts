import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

// import { environment } from '.././../../environments/environment'
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import { ItemService } from '../../services/item.service';
import { RentalService } from '../../services/rental.service';

import TileLayer from 'ol/layer/Tile';
import { RequestsComponent } from '../../requests/requests.component';
import { RentedItemsComponent } from '../../rented-items/rented-items.component';
import { YourItemsComponent } from '../../your-items/your-items.component';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [RouterLink,CommonModule ,RequestsComponent ,RentedItemsComponent ,YourItemsComponent] ,
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent implements OnInit {
  cars: any[] = [];
  token: string;
  borrowerRentals: any[] = [];
  itemOwnerRentals: any[] = [];

  public map!: Map

  // constructor(private itemService: ItemService) {
  //   this.getitems();

  // }
  ngOnInit(): void {

    // this.map = new Map({
    //   layers: [
    //     new TileLayer({
    //       source: new OSM(),
    //     }),
    //   ],
    //   target: 'map',
    //   view: new View({
    //     center: [30, 31],
    //     zoom: 2, maxZoom: 18,
    //   }),
    // });
  }

  selectedTab: string = 'your-items'; // Default selection

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  
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