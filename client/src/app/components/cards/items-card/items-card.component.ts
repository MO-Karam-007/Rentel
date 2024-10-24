import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { PaginationComponent } from '../../pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from "../../loading/loading.component";



@Component({
  selector: 'app-items-card',
  standalone: true,
  imports: [FormsModule, PaginationComponent, LoadingComponent],
  templateUrl: './items-card.component.html',
  styleUrl: './items-card.component.scss'
})
export class ItemsCardComponent implements OnInit {
  searchQuery: string = '';
  totalItems: number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 1;
  itemsList: any[];
  constructor(private itemService: ItemService, private toastrService: ToastrService) {
  }
  ngOnInit(): void {
    console.log("111");
    this.items(this.searchQuery)
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.items(this.searchQuery);
  }

  search() {
    this.currentPage = 1;
    this.items(this.searchQuery);
  }
  allowItem(id: number) {
    const token = this.itemService.getToken();

    this.itemService.publishItem(id, token).subscribe(

      () => {
        this.toastrService.success("Item published successfully");

        this.items(this.searchQuery); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    )
  }
  removeItem(id: number) {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");

    if (isConfirmed) {

      const token = this.itemService.getToken();

      this.itemService.deleteItem(id, token).subscribe(

        () => {
          this.toastrService.success("Item deleted successfully");

          this.items(this.searchQuery); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      )

    }
    else {
      this.toastrService.error("Please confirm to delete the item");
    }
  }


  items(query: string) {
    const token = this.itemService.getToken();
    console.log("222");


    this.itemService.allItems(token, query, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        console.log("333");

        console.log(data['data']);
        this.itemsList = data['data']
        this.totalItems = data['total']; //ظ Set the total items count


      },
      (error) => {
        console.error('Error fetching notification count:', error);
      }
    )
  }
}
