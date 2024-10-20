import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReviewComponent } from '../../review/review.component';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';



@Component({
  selector: 'app-farme2',
  standalone: true,
  imports: [CurrencyPipe, ReviewComponent],
  templateUrl: './farme2.component.html',
  styleUrl: './farme2.component.scss',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class Farme2Component implements OnInit {
  item!: any;


  productId: number;  // To store the extracted id

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }
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


}
