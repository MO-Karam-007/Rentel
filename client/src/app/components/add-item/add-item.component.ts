import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})

export class AddItemComponent implements OnInit {
  form!: FormGroup;
  minDateTime: string;


  @ViewChild('start') startEl!: ElementRef<any>;
  myDate = new Date();
  min!: string;
  token: string;
  previewUrls: string[] = [];  // Store image preview URLs
  categories: any[] = []


  // getControlNames(): string[] {
  //   return Object.keys(this.form.get('userInfo')?.controls || {});
  // }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private itemService: ItemService,
    private categoriesService: CategoriesService) {

    // console.log(getLocation());


    this.form = this.fb.group({
      userInfo: this.fb.group({
        name: ['', Validators.required],
        category_id: ['', Validators.required],
        description: [''],
        price: ['', Validators.required],
        latitude: ['', Validators.nullValidator],
        longitude: ['', Validators.nullValidator],
        item_image: [null, Validators.nullValidator],
        status: ['true', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }),
      skills: this.fb.array([]),  // Array of skills
      images: this.fb.array([])   // Array of images
    });

    // const now = new Date();
    // this.minDateTime = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:mm'
  }




  itemsArray: number[];
  ngOnInit() {
    this.getLocation();

    this.getCategories();

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.form.get('userInfo.startDate')?.valueChanges.subscribe(() => {
    //   this.calculateDuration();
    // });

    // this.form.get('userInfo.endDate')?.valueChanges.subscribe(() => {
    //   this.calculateDuration();
    // });


    // if (`${this.myDate.getMonth() + 1
    //   }`.length < 2) {
    //   this.min = `${this.myDate.getFullYear()} -0${this.myDate.getMonth() + 1} -${this.myDate.getDate()} `;
    // } else if (`${this.myDate.getDate()} `.length < 2) {
    //   this.min = `${this.myDate.getFullYear()} -${this.myDate.getMonth() + 1} -0${this.myDate.getDate()} `;
    // } else if (`${this.myDate.getMonth() + 1} `.length < 2 && `${this.myDate.getDate()} `.length < 2) {
    //   this.min = `${this.myDate.getFullYear()} -0${this.myDate.getMonth() + 1} -0${this.myDate.getDate()} `;
    // } else {
    //   this.min = `${this.myDate.getFullYear()} -${this.myDate.getMonth() + 1} -${this.myDate.getDate()} `;


    // }
  }


  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(

        (position: GeolocationPosition) => {
          this.form.get('userInfo').patchValue({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });

          // console.log(this.form.value.userInfo.latitude);
          // this.form.get('userInfo.latitude')?.markAsDirty();

          // this.form.get('userInfo.longitude')?.markAsDirty();
        },
        (error: GeolocationPositionError) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }


  getCategories() {
    console.log("Inside");
    this.categoriesService.categories().subscribe((data: any) => {
      this.categories = data.data;
    });
  }

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }




  // Add new skill to the form
  addSkill() {
    const skillForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    });
    this.skills.push(skillForm);
  }

  // Remove a skill from the form
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Add a new image control
  addImage() {
    const imageForm = this.fb.control(null);  // Placeholder for image file
    this.images.push(imageForm);
    this.previewUrls.push('');  // Initialize an empty preview URL
  }

  // Remove an image from the form
  removeImage(index: number) {
    this.images.removeAt(index);
    this.previewUrls.splice(index, 1);  // Remove the corresponding preview URL
  }


  handleFileInput(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Corrected form control access
      const userInfoForm = this.form.get('userInfo');

      if (userInfoForm) {
        // Update the specific control in the userInfo nested form
        userInfoForm.patchValue({
          [controlName]: file
        });

        // Update validation status
        userInfoForm.get(controlName)?.updateValueAndValidity();
      }
    }
  }


  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.images.at(index).setValue(file);

      // Generate image preview URL
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls[index] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }



  onSubmit() {



    const formData = new FormData();

    if (this.form.invalid) {
      console.error('Form is invalid!', this.form);
      return;
    }


    // Continue to process form values if valid
    const latitude = this.form.get('userInfo.latitude')?.value;
    const longitude = this.form.get('userInfo.longitude')?.value;

    if (!latitude || !longitude) {
      console.error('Latitude or Longitude missing!');
      return; // Return only if values are missing
    }


    // if (this.form.value.item_image) {
    //   formData.append('item_image', this.form.get('userInfo').value.item_image);
    // }

    // Calculate the duration in days before sending
    // this.duration = this.calculateDuration(startDate, endDate);

    // Append user info to formData
    const userInfo = this.form.get('userInfo')?.value;
    formData.append('name', userInfo.title);
    formData.append('category_id', userInfo.category_id);  // Assuming category is an ID
    formData.append('description', userInfo.description);
    formData.append('price', userInfo.price);
    formData.append('latitude', this.form.value.userInfo.latitude);
    formData.append('longitude', this.form.value.userInfo.longitude);
    formData.append('status', userInfo.status);

    console.log(this.form);

    this.token = localStorage.getItem('token');


    // Append skills to formData
    this.skills.controls.forEach((skill, index) => {
      formData.append(`skills[${index}][name]`, skill.get('name')?.value);
      formData.append(`skills[${index}][level]`, skill.get('level')?.value);
    });

    // Append images to formData
    this.images.controls.forEach((imageCtrl, index) => {
      const image = imageCtrl.value;
      if (image) {
        formData.append(`images[${index}]`, image);
      }
    });

    // Submit the form data via HTTP POST request
    this.itemService.createItem(formData, this.token).subscribe(
      response => {
        console.log('Item added successfully:', response);
      },
      error => {
        console.error('Error adding item:', error);
      }
    );
  }


  // getFormValidationErrors() {
  //   Object.keys(this.form.get('userInfo').controls).forEach(key => {
  //     const controlErrors = this.myForm.get(key)?.errors;
  //     if (controlErrors) {
  //       Object.keys(controlErrors).forEach(keyError => {
  //         console.log(`Field: ${key}, Error Type: ${keyError}, Error Details: `, controlErrors[keyError]);
  //       });
  //     }
  //   });
  // }


  daysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
    const diffInTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInTime / oneDay);
  }

}
