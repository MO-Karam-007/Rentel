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
  cars: any[] = []
  token: string;
  items: any[];


  constructor(private itemService: ItemService) {
    this.token = localStorage.getItem('token');

    this.getitems()
  }

  ngOnInit(): void {
    // this.itemService.getItems().subscribe((response) => {
    //   console.log(response)
    //   this.cars = response.data; // Adjust as needed based on your API response
    // });
  }

  getitems() {
    this.itemService.items(this.token).subscribe(
      (data) => {
        // console.log(data.data);
        this.cars = data.data
        // this.userImage = `localhost:8000/storage/` + profile.profile_picture; // Adjust based on your API response
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );

  }

}

