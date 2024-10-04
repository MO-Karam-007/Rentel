import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { tt } from '@tomtom-international/web-sdk-maps'


@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  requests: number[] = [1, 2, 3, 4]


  // map: any = tt.map({
  // key: '<your maps api key>',
  // container: 'map'
  // });
}
