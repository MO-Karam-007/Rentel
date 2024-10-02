import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent, NgClass, NgStyle],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  items = [1, 2, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]


}
