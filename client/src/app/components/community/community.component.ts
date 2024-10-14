import { Component } from '@angular/core';
import { PostService } from '../../post.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../../post-dialog/post-dialog.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-community',
  standalone: true,
  imports: [HttpClientModule , CommonModule ,PostDialogComponent,FormsModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {
  posts: any[] = [];

  extractedPosts : any[] = [];;
  constructor(private postService: PostService ,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPosts(); 
  }
  loadPosts() {
    this.postService.getPosts().subscribe(
      (response) => {
        if (response.success) { // Check if the response indicates success
          // Store the retrieved posts in this.posts
          this.posts = response.data.map((post: any) => ({
            id: post.id,
            created_at: post.created_at,
            updated_at: post.updated_at,
            creator_id: post.creator_id,
            title: post.title,        // Extracting title here
            description: post.description,
            creator: post.creator      // Assuming creator contains relevant info
          }));
  
          console.log('Extracted Posts:', this.posts); // Log extracted post data
        } else {
          console.error('Error:', response.message); // Handle error case
        }
      },
      (error) => {
        console.error('Error fetching posts:', error); // Handle network error
      }
    );
  }

  openPostDialog() {
    const dialogRef = this.dialog.open(PostDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.submitPost(result);
      }
    });

  }
  submitPost(postData: { title: string; description: string }) {
    console.log('Post Data:', postData);
    this.postService.createPost(postData).subscribe(
      response => {
        console.log('Post created successfully', response);
        this.loadPosts(); // Reload posts only after a successful creation
      },
      error => {
        console.error('Error creating post', error);
      }
    );
  }
  
}
