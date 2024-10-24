import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-page',
  standalone: true,
  imports: [],
  templateUrl: './signout-page.component.html',
  styleUrl: './signout-page.component.scss'
})
export class SignoutPageComponent {


  constructor(private router: Router) {

  }
  signout() {

    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }


}
