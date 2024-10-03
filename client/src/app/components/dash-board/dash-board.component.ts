import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  requests: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

}
