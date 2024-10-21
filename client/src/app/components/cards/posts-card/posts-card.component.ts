import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RequestsService } from '../../../services/requests.service';

@Component({
  selector: 'app-posts-card',
  standalone: true,
  imports: [],
  templateUrl: './posts-card.component.html',
  styleUrl: './posts-card.component.scss'
})
export class PostsCardComponent implements OnInit {

  postsList!: any[];
  constructor(private requestsService: RequestsService) {
  }
  ngOnInit(): void {
    this.posts()
  }


  posts() {

    this.requestsService.getRequests().subscribe(
      (data) => {
        // console.log("77777777777777777", data.data);
        this.postsList = data.data
      },
      (error) => {
        console.error('Error fetching notification count:', error);
      }
    )
  }

  removePost(id: number) {
    const token = localStorage.getItem('token') || '';

    this.requestsService.deleteRequest(id, token).subscribe(
      () => {
        console.log(`Post with ID ${id} deleted successfully.`);
        this.posts(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    )

  }
}

