import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  user: any;
  credentials: any = {
    email: '',
    password: ''
  };
  // private authService: AuthService
  constructor(private router: Router, private authService: AuthService, private toastrService: ToastrService) {

  }


  login(form: any) {


    this.credentials.email = form.value.email
    this.credentials.password = form.value.password


    this.authService.login(this.credentials).subscribe(
      (res: any) => {
        // console.log(res.data.profileCompletion);
        localStorage.setItem('token', res.data.token);

        console.log("FFFFFFFFFFFFf");

        console.log(res.data);
        console.log(res.data.ban == true);
        console.log("FFFFFFFFFFFFf");
        if (res.data.ban === true) {
          this.router.navigate(['/ban'])
          localStorage.removeItem('token')
          return;
        }

        if (res.data.profileCompletion) {
          this.router.navigate(['/complete-data']);
        }
        else if (res.data.role === 'admin') {
          this.router.navigate(['/admin-users']);
        }
        else {
          this.router.navigate(['/']);
        }
      },
      (error: any) => {
        this.toastrService.error(error.error.message);
        console.log(error);
      })

  }

}
