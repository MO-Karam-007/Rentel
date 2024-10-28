import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { LoadingComponent } from "../../loading/loading.component";
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [FormsModule, PaginationComponent, LoadingComponent, NgClass, CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {
  searchQuery: string = '';
  usersList!: any[];
  totalItems: number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 1;
  isImageModalOpen = false;
  selectedImage: string | null = null;

  openImageModal(imagePath: string) {
    this.selectedImage = imagePath;
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
    this.selectedImage = null;
  }

  constructor(private authService: AuthService, private toastrService: ToastrService) {
  }
  ngOnInit(): void {
    this.users(this.searchQuery)
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.users(this.searchQuery);
  }

  search() {
    this.currentPage = 1;
    this.users(this.searchQuery);
  }

  users(query: string) {
    // const token = localStorage.getItem('token') || '';
    const token = this.authService.getToken()

    this.authService.allUsers(token, query, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.usersList = data['data']['data'];
        this.totalItems = data['data']['total'];

      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleBan(user: any) {
    const token = this.authService.getToken();

    if (user.banned) {
      this.authService.unbanUser(token, user.id).subscribe(
        (response) => {
          user.banned = response.banned;
          this.users(this.searchQuery);
          this.toastrService.success('User unbanned successfully');
        },
        (error) => {
          console.error(error);
          this.toastrService.error(error.message);
        }
      );
    } else {
      // If user is not banned, call banUser
      this.authService.banUser(token, user.id).subscribe(
        (response) => {
          user.banned = response.banned;
          this.users(this.searchQuery);
          this.toastrService.success('User banned successfully');
        },
        (error) => {
          console.error(error);
          this.toastrService.error(error.message);
        }
      );
    }
  }

  // ban(id: number) {
  //   const token = this.authService.getToken();
  //   this.authService.banUser(token, id).subscribe(
  //     (data) => {
  //       this.toastrService.success('User banned successfully')
  //     },
  //     (error) => {
  //       console.error(error);
  //       this.toastrService.error(error.message);
  //     }
  //   );
  // }

}
