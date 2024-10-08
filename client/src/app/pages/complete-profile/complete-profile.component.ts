import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './complete-profile.component.html',
  styleUrl: './complete-profile.component.scss'
})
export class CompleteProfileComponent implements OnInit {
  profileData: any = {
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    profile_picture: null,
    identification_scan: null,
    latitude: '',
    longitude: ''
  };
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.getLocation();

  }

  handleFileInput(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.profileData[fieldName] = file;  // Assign file object to profileData
    }
  }

  getLocation() {
    console.log(navigator.geolocation);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.profileData.latitude = position.coords.latitude;
          this.profileData.longitude = position.coords.longitude;
          console.log(this.profileData.latitude);
          console.log(this.profileData.longitude);
        }
      },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  completeProfile(form: any) {
    if (form.invalid) return;

    this.profileData.first_name = form.value.first_name;
    this.profileData.last_name = form.value.last_name;
    this.profileData.phone = form.value.phone;
    this.profileData.address = form.value.address;
    // this.profileData.profile_picture = form.value.profile_picture || '/home/karam/Downloads/image1.jpeg';
    // this.profileData.identification_scan = form.value.identification_scan || '/home/karam/Downloads/image2.jpeg';



    this.getLocation();
    console.log(this.profileData);

    console.log("111");
    const token = localStorage.getItem('token') || '';
    console.log("111");

    this.authService.completeProfile(this.profileData, token).subscribe(
      (res: any) => {
        console.log('Profile completed successfully:', res);
        console.log("111");

        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Profile completion failed:', error);
        console.log("111");

      }
    );
  }





}
