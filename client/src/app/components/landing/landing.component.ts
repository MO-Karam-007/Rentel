import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [DatePipe, RouterLink, FormsModule, SearchComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  @ViewChild('start') startEl!: ElementRef<any>;
  myDate = new Date();
  min!: string;
  radius: number = 7;  // Default radius value


  ngOnInit(): void {


    if (`${this.myDate.getMonth() + 1}`.length < 2) {
      this.min = `${this.myDate.getFullYear()}-0${this.myDate.getMonth() + 1}-${this.myDate.getDate()}`;
    } else if (`${this.myDate.getDate()}`.length < 2) {
      this.min = `${this.myDate.getFullYear()}-${this.myDate.getMonth() + 1}-0${this.myDate.getDate()}`;
    } else if (`${this.myDate.getMonth() + 1}`.length < 2 && `${this.myDate.getDate()}`.length < 2) {
      this.min = `${this.myDate.getFullYear()}-0${this.myDate.getMonth() + 1}-0${this.myDate.getDate()}`;
    } else {
      this.min = `${this.myDate.getFullYear()}-${this.myDate.getMonth() + 1}-${this.myDate.getDate()}`;
    }
  }

  showelement() {
  }
}
