import { Component } from '@angular/core';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {
  posts: number[] = Array.from(Array(100).keys())


}
