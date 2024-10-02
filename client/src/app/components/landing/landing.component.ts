import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  @ViewChild('start') startEl!:ElementRef<any>;
  myDate = new Date();
  min!:string ;

  ngOnInit(): void {
    

    if(`${this.myDate.getMonth() + 1}`.length < 2) {
      this.min =`${this.myDate.getFullYear()}-0${this.myDate.getMonth() + 1}-${this.myDate.getDate()}`;
    }else if (`${this.myDate.getDate()}`.length < 2){
      this.min =`${this.myDate.getFullYear()}-${this.myDate.getMonth() + 1}-0${this.myDate.getDate()}`;
    }else if (`${this.myDate.getMonth() + 1}`.length < 2 && `${this.myDate.getDate()}`.length < 2) {
      this.min =`${this.myDate.getFullYear()}-0${this.myDate.getMonth() + 1}-0${this.myDate.getDate()}`;
    }else {
      this.min =`${this.myDate.getFullYear()}-${this.myDate.getMonth() + 1}-${this.myDate.getDate()}`;
    }
  }

  showelement() {
  }
}
