import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';



@Component({
  selector: 'app-items-card',
  standalone: true,
  imports: [],
  templateUrl: './items-card.component.html',
  styleUrl: './items-card.component.scss'
})
export class ItemsCardComponent implements OnInit {
  itemsList!: any[];
  constructor(private itemService: ItemService) {
  }
  ngOnInit(): void {
    this.items()
  }


  items() {
    // const token = localStorage.getItem('token') || '';
    const token = this.itemService.getToken();

    this.itemService.allItems(token).subscribe(
      (data: any[]) => {
        this.itemsList = data

      },
      (error) => {
        console.error('Error fetching notification count:', error);
      }
    )
  }
}
