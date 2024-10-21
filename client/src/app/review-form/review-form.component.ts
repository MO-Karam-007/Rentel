import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import this!
import { ReactiveFormsModule } from '@angular/forms'; // Add this for forms
import { MatDialogRef, matDialogAnimations } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';  // Add MatDialogModule
import { ReviewService } from '../review.service';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,MatDialogModule ,CommonModule ,    MatSnackBarModule,],  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent {
  // Define the form group
  // reviewForm: FormGroup;
  // ratings: number[] = [1, 2, 3, 4, 5];
  // constructor(private fb: FormBuilder) {
  //   this.reviewForm = this.fb.group({ // Initialize in the constructor
  //     rating: ['', Validators.required],
  //     comment: ['', [Validators.required, Validators.minLength(5)]],
  //   });
  // }
  // onSubmit(): void {
  //   if (this.reviewForm.valid) {
  //     console.log(this.reviewForm.value);
  //   }
  // }
  userId: number;
  item_id: number;  // Declare a variable to hold the item_id
  stars: number[] = [1, 2, 3, 4, 5]; // 5 stars for rating

  Reviewdata = {
    reviewed_id: 2,
    rating: 0,
    comment: ''
  };
  hoverRating: number = 0; // Temporary rating for hover effect
  hover(rating: number): void {
    this.hoverRating = rating;
  }

  leave(): void {
    this.hoverRating = 0; // Reset hover state
  }
  

  constructor(public dialogRef: MatDialogRef<ReviewFormComponent> ,private reviewservice :ReviewService ,private authService: AuthService ,@Inject(MAT_DIALOG_DATA) public data: { item_id: number } ,private snackBar: MatSnackBar) {
    this.item_id = data.item_id;  // Assign the passed item_id to the variable
  }

  // ngOnInit() {
  //   const token = localStorage.getItem('token');

  //   this.authService.currentUser(token).subscribe(
  //     user => {
  //       this.userId = user.id;  // Set the user ID once the data is retrieved
  //       console.log('Authenticated User ID:', this.userId);
  //     },
  //     error => {
  //       console.error('Error fetching authenticated user', error);
  //     }
  //   );
  // }
  // Function to set the rating when a star is clicked
  rate(rating: number): void {
    this.Reviewdata.rating = rating;
  }

  // Function to handle form submission
  // onSubmit(): void {
  //   if (this.Reviewdata.rating && this.Reviewdata.comment.length >= 10) {
  //     console.log('Review submitted:', this.Reviewdata);
  //     this.dialogRef.close(); // Close the modal on successful submit
  //   } else {
  //     console.error('Invalid form');
  //   }
  // }

  // Function to handle form cancellation
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without submitting
  }


  onSubmit() {
    this.Reviewdata.reviewed_id = this.item_id;
    console.log('Post Data:', this.Reviewdata);
  
    this.reviewservice.createReview(this.Reviewdata).subscribe(
      response => {
        console.log('Review created successfully', response);
        this.dialogRef.close();
  
        // Show a success message
        this.snackBar.open('Review created successfully!', 'Close', {
          duration: 3000,  // Duration in milliseconds
        });
      },
      error => {
        console.error('Error creating Review', error);
        // Optionally, show an error message
        this.snackBar.open('Error creating review. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    );
  }


}