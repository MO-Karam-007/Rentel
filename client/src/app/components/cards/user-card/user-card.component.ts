import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [FormsModule, PaginationComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {
  searchQuery: string = '';
  usersList!: any[];
  totalItems: number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 1;



  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.users(this.searchQuery)
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.users(this.searchQuery);
  }

  search() {
    this.currentPage = 1; // Reset to first page when searching
    this.users(this.searchQuery);
  }

  users(query: string) {
    const token = localStorage.getItem('token') || '';

    this.authService.allUsers(token, query, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.usersList = data['data']['data'];
        this.totalItems = data['data']['total']; // Set the total items count
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
