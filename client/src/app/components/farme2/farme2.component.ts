import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReviewComponent } from '../../review/review.component';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { RentalService } from '../../services/rental.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-farme2',
  standalone: true,
  imports: [CurrencyPipe, ReviewComponent ],
  templateUrl: './farme2.component.html',
  styleUrl: './farme2.component.scss',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class Farme2Component implements OnInit {
  item!: any;


  productId: number;  // To store the extracted id

  constructor(private route: ActivatedRoute, private itemService: ItemService ,private rentalService: RentalService ,  private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id');
    console.log(this.productId);

    this.getItem();
  }


  getItem() {
    this.itemService.getItem(this.productId).subscribe((response) => {
      this.item = response.data;
      console.log(this.item);
    });
  }
  calculateEndDate(): string {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 7); // Example: Rent for 7 days
    return futureDate.toISOString().split('T')[0]; // Return date in 'YYYY-MM-DD' format
  }
  
  renting(id: any) {
    const token = localStorage.getItem('token');
    const endDate = this.calculateEndDate();
    const data = {
      item_id: id,
      end_date: endDate
    };
  
    this.rentalService.rentItem(data, token).subscribe({
      next: (response) => {
        console.log('Rental created successfully', response);
        this._snackBar.open('Rental created successfully!', 'Close', {
          duration: 3000,  // Toast duration in milliseconds
        });
      },
      error: (error) => {
        console.error('Error creating rental', error);
        this._snackBar.open('Error creating rental. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  
}
