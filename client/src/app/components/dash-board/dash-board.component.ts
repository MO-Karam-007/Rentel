import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { environment } from '.././../../environments/environment'
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import { ItemService } from '../../services/item.service';
import TileLayer from 'ol/layer/Tile';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent implements OnInit {
  cars: any[] = [];
  token: string;


  public map!: Map

  constructor(private itemService: ItemService) {
    this.getitems();

  }
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

  getitems() {
    const token = localStorage.getItem('token') || '';
    this.itemService.myItems(token).subscribe(
      (data) => {
        // console.log(data);
        this.cars = Array.isArray(data) ? data : []
        // this.userImage = `localhost:8000/storage/` + profile.profile_picture; // Adjust based on your API response
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );

  }
}