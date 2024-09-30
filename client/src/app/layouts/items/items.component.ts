import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NavbarComponent, SearchComponent, FooterComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  cars: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
