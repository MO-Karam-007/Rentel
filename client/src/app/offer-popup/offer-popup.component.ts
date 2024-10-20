import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from '../services/item.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { ToastrService } from 'ngx-toastr';  // Import ToastrService

@Component({
  selector: 'app-offer-popup',
  standalone: true,
  imports: [CommonModule ,MatProgressSpinnerModule ] ,
  templateUrl: './offer-popup.component.html',
  styleUrl: './offer-popup.component.scss'
})
export class OfferPopupComponent {
  items: any[] = [
    // Sample request data
    { id: '001', name: 'Item A', price: 100, startDate: '01/01/2024', current_state: 'Pending' },
    { id: '002', name: 'Item B', price: 150, startDate: '02/01/2024', current_state: 'Approved' },
  ];
  isLoading: boolean = true; // Loading flag
  postId: number;
  
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<OfferPopupComponent>,
    private itemService: ItemService ,// Injecting the service
    @Inject(MAT_DIALOG_DATA) public data: { postId: number }
  ) {
    this.getitems(); // Fetch items when the dialog opens
    if (data && data.postId !== null) {
      this.postId = data.postId;
      console.log('Creator ID:', this.postId); // Log the creatorId for debugging
    } else {
      console.error('No creatorId provided!');
      this.postId = 0; // Handle this case as needed
    }  }

  close(): void {
    this.dialogRef.close();
  }

 
  getitems() {
    const token = localStorage.getItem('token') || '';
    this.isLoading = true; // Set loading to true at the start
    this.itemService.myItems(token).subscribe(
      (data) => {
        console.log(data);
        this.items = Array.isArray(data) ? data : [];
        this.isLoading = false; // Set loading to false after data is fetched
      },
      (error) => {
        console.error('Error fetching items', error);
        this.isLoading = false; // Set loading to false if there's an error
      }
    );
  }

 offer( id :number){
  const token = localStorage.getItem('token') || '';

  const url = `http://localhost:8000/api/posts/${this.postId}/offer/${id}`;

  // Add headers if needed (including the Authorization header)
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Replace with actual token
  };

  // Make the HTTP POST request
  this.http.post(url, {}, { headers }).subscribe(
    (response) => {
      console.log('Offer made successfully:', response);
      //alert('Offer made successfully!');
      this.toastr.success('Offer made successfully!', 'Success');  // Success notification
    },
    (error) => {
      console.error('Error making offer:', error);
    //  alert('Failed to make offer');
    this.toastr.error('Failed to make offer', 'Error');  // Error notification
    }
  );
}

 }


