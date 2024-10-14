import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './complete-profile.component.html',
  styleUrl: './complete-profile.component.scss'
})
export class CompleteProfileComponent implements OnInit {

  form!: FormGroup;
  selectedFile: File | null = null;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getLocation();
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      profile_picture: [null, Validators.required],
      identification_scan: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
    });
  }




  handleFileInput(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({
        [controlName]: file
      });
      this.form.get(controlName)?.updateValueAndValidity();
    }
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            this.form.patchValue({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  onSubmit() {
    console.log("Hello WORLD111");

    if (this.form.invalid) {
      console.log(this.form);
      console.log("Hello WORLD RTTOT");
      return;
    }



    const formData = new FormData();
    formData.append('first_name', this.form.value.first_name);
    formData.append('last_name', this.form.value.last_name);
    formData.append('phone', this.form.value.phone);
    formData.append('address', this.form.value.address);
    formData.append('latitude', this.form.value.latitude);
    formData.append('longitude', this.form.value.longitude);

    // formData.append('profile_picture', this.form.get('profile_picture')?.value); // Add the file
    // formData.append('identification_scan', this.form.get('identification_scan')?.value); // Add the file
    // Append the files to FormData if they exist
    if (this.form.value.profile_picture) {
      formData.append('profile_picture', this.form.value.profile_picture);
    }
    if (this.form.value.identification_scan) {
      formData.append('identification_scan', this.form.value.identification_scan);
    }
    console.log("Hello WORLD");
    // Send the form data to the server
    const token = localStorage.getItem('token') || '';


    this.authService.completeProfile(formData, token).subscribe(
      (res: any) => {
        console.log('Profile completed successfully:', res);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Profile completion failed:', error);
      }
    );
  }




}
