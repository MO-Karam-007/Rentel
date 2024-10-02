import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this!
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
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
    const stars = Array(fullStars).fill('★');
    return stars;
  }
}