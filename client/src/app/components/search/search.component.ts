import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, RouterLink, DecimalPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  selectedDistance: number = 7;
  searchTerm: string = '';

  @Output() searchParamsChanged = new EventEmitter<{ distance: number; term: string }>(); // Emit selected distance

  constructor(private http: HttpClient, private router: Router) { }


  onRangeChange() {
    this.emitSearchParams();
  }

  onSearchTermChange() {
    this.emitSearchParams();
  }

  emitSearchParams() {

    this.router.navigate(['/items']);

    console.log("Emitting search params");
    this.searchParamsChanged.emit({
      distance: this.selectedDistance,
      term: this.searchTerm
    });
  }

}
