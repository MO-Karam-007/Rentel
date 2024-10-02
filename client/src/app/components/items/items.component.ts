import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NavbarComponent,SearchComponent ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  cars: number[] = [1, 2, 4, 5, 6, 7, 8, 8, 10]
}
