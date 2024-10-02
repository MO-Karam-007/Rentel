import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import this!
import { ReactiveFormsModule } from '@angular/forms'; // Add this for forms
@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent {
  // Define the form group
  reviewForm: FormGroup;
  ratings: number[] = [1, 2, 3, 4, 5];
  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({ // Initialize in the constructor
      rating: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  onSubmit(): void {
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value);
    }
  }
}