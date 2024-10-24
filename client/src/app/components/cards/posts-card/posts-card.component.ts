import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RequestsService } from '../../../services/requests.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PaginationComponent } from '../../pagination/pagination.component';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-posts-card',
  standalone: true,
  imports: [FormsModule, PaginationComponent, LoadingComponent],
  templateUrl: './posts-card.component.html',
  styleUrl: './posts-card.component.scss'
})
export class PostsCardComponent implements OnInit {
  searchQuery: string = '';
  totalItems: number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 1;
  postsList!: any[];
  constructor(private requestsService: RequestsService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.posts(this.searchQuery)
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.posts(this.searchQuery);
  }

  search() {
    this.currentPage = 1;
    this.posts(this.searchQuery);
  }

  posts(query: string) {
    const token = this.requestsService.getToken()


    this.requestsService.getRequests(query, this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.postsList = data.data.data
        this.totalItems = data['data']['total']; // Set the total items count

      },
      (error) => {
        console.error('Error fetching notification count:', error);
      }
    )
  }

  removePost(id: number) {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");

    if (isConfirmed) {

      const token = this.requestsService.getToken();

      this.requestsService.deleteRequest(id, token).subscribe(

        () => {
          this.toastrService.success("Post deleted successfully");

          this.posts(this.searchQuery); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      )

    }
    else {
      this.toastrService.error("Please confirm to delete the post");
    }


  }
}

