import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(private authService: AuthService, private router: Router) { }
  credentials: any = {
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  };



  signup(form: any) {

    this.credentials.username = form.value.username
    this.credentials.email = form.value.email
    this.credentials.password = form.value.password
    this.credentials.password_confirmation = form.value.password_confirmation

    console.log(this.credentials);
    this.authService.register(this.credentials).subscribe(
      (res: any) => {
        console.log("User registration");

        localStorage.setItem('token', res.data.token);

        this.router.navigate(['/complete-data']);
      });
  }

  signInWithGoogle() {
    window.location.href = 'localhost:8000/oauth/google/redirect';


  }

}
