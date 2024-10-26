import { Component, ViewChild } from '@angular/core';
import { PostService } from '../../post.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../../post-dialog/post-dialog.component';
import { FormsModule } from '@angular/forms';
import { OfferPopupComponent } from '../../offer-popup/offer-popup.component';
import { AuthService } from '../../services/auth.service'; // Adjust the path according to your project structure
@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, PostDialogComponent, FormsModule, OfferPopupComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {
  posts: any[] = [];
  userImage: string = ''

  authId: number;
  loading: boolean = true; // Initialize loading to true
  extractedPosts: any[] = [];
  constructor(private postService: PostService, private dialog: MatDialog, private authService: AuthService) {
  }
  ngOnInit(): void {
    // const token = localStorage.getItem('token'); // Assuming token is stored in local storage
    const token = this.postService.getToken();
    this.getUser();  // Call getUser() only if the token exists


    if (token) {
      this.authService.currentUser(token).subscribe(
        (response) => {
          this.authId = response.data.message.id;
          this.loadPosts();
        },
        (error) => {
          console.error('Error fetching current user:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('No token found');
      this.loading = false; // Stop loading if no token
    }
  }
  loadPosts() {

    this.postService.getPosts().subscribe(
      (response) => {
        if (response.success) { // Check if the response indicates success
          // Filter out posts created by the authenticated user

          this.posts = response.data.data
            .filter((post: any) => post.creator_id !== this.authId) // Exclude user's own posts
            .map((post: any) => ({
              id: post.id,
              created_at: post.created_at,
              updated_at: post.updated_at,
              creator_id: post.creator_id,
              title: post.title,        // Extracting title here
              description: post.description,
              creator: post.creator      // Assuming creator contains relevant info
            }));

          this.loading = false; // Set loading to false after posts are fetched
        } else {
          console.error('Error:', response.message); // Handle error case
          this.loading = false; // Set loading to false after posts are fetched
        }
      },
      (error) => {
        console.error('Error fetching posts:', error); // Handle network error
        this.loading = false; // Set loading to false even on error
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
    // const token = localStorage.getItem('token');
    const token = this.postService.getToken();


    this.postService.createPost(postData, token).subscribe(
      response => {
        console.log('Post created successfully', response);
        this.loadPosts(); // Reload posts only after a successful creation
      },
      error => {

        console.error('Error creating post', error, token);
      }
    );
  }

  @ViewChild('popup') popup!: OfferPopupComponent;


  openItemDialog(postId: number): void {
    this.dialog.open(OfferPopupComponent, {
      width: '90vw',
      maxWidth: '100vw',
      height: '80vh',  // 80% of the viewport height
      maxHeight: '90vh', // Adjust the dialog size
      data: { postId }
    });
  }

  getUser() {
    const token = localStorage.getItem('token') || '';
    this.authService.currentUser(token).subscribe(
      (data) => {
        console.log(data)
        this.userImage = data.data.message.profile_picture
        console.log(this.userImage)


      },
      (error) => {
        console.error('Error fetching user data', error);

      }
    );
  }

}
