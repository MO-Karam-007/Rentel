import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NavbarComponent, SearchComponent, RouterLink],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  cars: number[] = []

  constructor(private itemService: ItemService) {

  }

  ngOnInit(): void {
    // this.itemService.getItems().subscribe((response) => {
    //   console.log(response)
    //   this.cars = response.data; // Adjust as needed based on your API response
    // });
  }
}

