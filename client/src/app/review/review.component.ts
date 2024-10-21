import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this!
import { ReviewService } from '../review.service';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  reviews: any[] = []; // Array to store reviews
  isLoading = true; // Flag to show loading state
  constructor(private reviewService: ReviewService) {}
  @Input() itemId!: number; // Use ! to indicate that this property will be initialized later

  // You can use itemId in your component logic as needed
  ngOnInit() {
    console.log('Item ID received in review component:', this.itemId);
    if (this.itemId) {
      this.getItemReviews(this.itemId);
    }
  }
  profile = {
    name: 'Thomas Lacier',
    flag: 'assets/spain-flag.png',
    title: 'Opportunity seeker, business owner, hard price negotiator.',
    purchases: 32,
    rating: 4.8,
    reviews: [
      {
        sellerName: 'Quaxo',
        sellerFlag: 'assets/croatia-flag.png',
        sellerLogo: 'assets/quaxo-logo.png',
        comment: 'Perfect client, great negotiator.',
      },
      {
        sellerName: 'Zoomlounge',
        sellerFlag: 'assets/turkey-flag.png',
        sellerLogo: 'assets/zoomlounge-logo.png',
        comment: 'The best thing I liked when negotiating with Thomas was the ability to always meet my expectations. He has great communications skills too!',
      },
      {
        sellerName: 'Gigabox',
        sellerFlag: 'assets/serbia-flag.png',
        sellerLogo: 'assets/gigabox-logo.png',
        comment: 'Great client, recommended!',
      }
    ],
    ratingDistribution: [
      { value: 5, percentage: 80 },
      { value: 4, percentage: 15 },
      { value: 3, percentage: 5 },
      { value: 2, percentage: 0 },
      { value: 1, percentage: 0 }
    ]
  };
  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? ['★'] : []; // Check for half star
    const emptyStars = Array(5 - fullStars - halfStar.length).fill('☆');

    // Combine full, half, and empty stars into a single array
    return [...Array(fullStars).fill('★'), ...halfStar, ...emptyStars];
}

  getItemReviews(itemId: number): void {
    this.reviewService.getItemReviews(itemId).subscribe(
      (data) => {
        //console.log(data)
        this.reviews = data.reviews; // Assuming the response is an array of reviews
        console.log(this.reviews)

        this.isLoading = false; // Set loading to false when data is received
      },
      (error) => {
        console.error('Error fetching item reviews', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
  }


  getAverageRating(): number {
    if (this.reviews.length === 0) return 0; // Prevent division by zero
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((totalRating / this.reviews.length).toFixed(1)); // Average to one decimal place
  }

  getRatingDistribution(): { value: number; percentage: number }[] {
    const distribution: { [key: number]: number } = {};
    this.reviews.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
  
    // Calculate total reviews
    const totalReviews = this.reviews.length;
  
    // Create an array with rating values and their respective percentages
    return Array.from({ length: 5 }, (_, index) => {
      const rating = index + 1; // Ratings from 1 to 5
      const count = distribution[rating] || 0;
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return { value: rating, percentage };
    });
  }
  
}