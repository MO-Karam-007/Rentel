import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from '../../requests/requests.component';
import { RentedItemsComponent } from '../../rented-items/rented-items.component';
import { YourItemsComponent } from '../../your-items/your-items.component';
import { Map, MapStyle, config, Marker } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import { ItemService } from '../../services/item.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [RouterLink, CommonModule, RequestsComponent, RentedItemsComponent, YourItemsComponent],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class DashBoardComponent implements OnInit, AfterViewInit {
  items: any[];
  token: string;
  borrowerRentals: any[] = [];
  map: Map | undefined;
  itemOwnerRentals: any[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 1;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  constructor(private itemService: ItemService, private authServuice: AuthService) { }

  ngOnInit(): void {
    this.getitems();
    config.apiKey = 'XwI4ePJTomUjauGZpJcH';
    this.getMe()

  }


  ngAfterViewInit() {


    new Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(this.map);
    new Marker({ color: "#FF0000" })
      .setLngLat([139.5525, 35.7846])
      .addTo(this.map);
  }

  initMap(lng, lat) {

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [lng, lat],
      zoom: 14
    });
    // new Marker({ color: "#FF0000" })
    //   .setLngLat([139.7525, 35.6846])
    //   .addTo(this.map);
    // new Marker({ color: "#FF0000" })
    //   .setLngLat([139.5525, 35.7846])
    //   .addTo(this.map);

  }

  ngOnDestroy() {
    this.map?.remove();
  }
  selectedTab: string = 'your-items'; // Default selection

  selectTab(tab: string) {
    this.selectedTab = tab;
  }


  getMe() {
    const token = this.authServuice.getToken();
    this.authServuice.currentUser(token).subscribe(
      (data) => {
        // console.log('User data:', data.data.message.longitude, data.data.message.latitude);
        this.initMap(data.data.message.longitude, data.data.message.latitude)
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }


  // getLocOfItems() {
  //   const token = this.itemService.getToken();

  //   this.itemService.myItemsloc(token).subscribe(
  //     (data) => {
  //       // console.log('User data:', data.data.message.longitude, data.data.message.latitude);
  //       this.initMap(data.data.message.longitude, data.data.message.latitude)
  //     },
  //     (error) => {
  //       console.error('Error fetching user data', error);
  //     }
  //   )
  // }

  addMarkers(): void {
    if (!this.map) return;

    this.items.forEach((item) => {
      if (item.lat && item.lng) {
        new Marker({ color: "#FF0000" })
          .setLngLat([item.lng, item.lat])
          .addTo(this.map);
      }
    });
  }


  getitems() {

    const token = this.itemService.getToken();

    this.itemService.myItems(token, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.items = data['data'].data;
        this.totalItems = data['data']['total'];
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
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