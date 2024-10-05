import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '.././../../environments/environment'
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {

  public map!: Map
  // latitude: number = 30.0777472 // global scope
  // longitude: number = 31.2410112 // global scope


  constructor() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     latitude = position.coords.latitude;
    //     longitude = position.coords.longitude;
    //   })
    // }


  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [30, 31],
        zoom: 2, maxZoom: 18,
      }),
    });
  }
}