import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';  // Add MatDialogModule

@Component({
  selector: 'app-post-dialog',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,MatDialogModule],
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.scss'
})
export class PostDialogComponent {
  postData = { title: '', description: '' };

  constructor(public dialogRef: MatDialogRef<PostDialogComponent>) {}

  onSubmit() {
    if (this.postData.title && this.postData.description) {
      this.dialogRef.close(this.postData); // Close dialog and send data back
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
