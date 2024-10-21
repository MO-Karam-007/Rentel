import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {

  usersList!: any[];
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.users()
  }


  users() {
    const token = localStorage.getItem('token') || '';

    this.authService.allUsers(token).subscribe(
      (data) => {

        // return
        console.log(data['data']['data']);

        this.usersList = data['data']['data']
      },
      (error) => {
        console.error('Error fetching notification count:', error);
      }
    )
  }
}
