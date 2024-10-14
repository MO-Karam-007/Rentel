import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { CategoriesService } from '../../services/categories.service';

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

  constructor(private fb: FormBuilder, private itemService: ItemService, private categoriesService: CategoriesService) {
    this.token = localStorage.getItem('token');
    this.getLocation();

    // console.log(getLocation());


    this.form = this.fb.group({
      userInfo: this.fb.group({
        name: ['', Validators.required],
        category: ['', Validators.required],
        description: [''],
        price: ['', Validators.required],
        duration: ['', Validators.required],
        latitude: [null, Validators.required],
        longitude: [null, Validators.required],
        item_image: [null, Validators.required],
        status: ['Available', Validators.required],
        tags: ['']
      }),
      skills: this.fb.array([]),  // Array of skills
      images: this.fb.array([])   // Array of images
    });

    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:mm'

  }



  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.form.get('userInfo.latitude')?.patchValue(position.coords.latitude);
          this.form.get('userInfo.longitude')?.patchValue(position.coords.longitude);
        },
        (error: GeolocationPositionError) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  itemsArray: number[];
  ngOnInit(): void {

    this.getCategories();
    this.getLocation();

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (`${this.myDate.getMonth() + 1
      }`.length < 2) {
      this.min = `${this.myDate.getFullYear()} -0${this.myDate.getMonth() + 1} -${this.myDate.getDate()} `;
    } else if (`${this.myDate.getDate()} `.length < 2) {
      this.min = `${this.myDate.getFullYear()} -${this.myDate.getMonth() + 1} -0${this.myDate.getDate()} `;
    } else if (`${this.myDate.getMonth() + 1} `.length < 2 && `${this.myDate.getDate()} `.length < 2) {
      this.min = `${this.myDate.getFullYear()} -0${this.myDate.getMonth() + 1} -0${this.myDate.getDate()} `;
    } else {
      this.min = `${this.myDate.getFullYear()} -${this.myDate.getMonth() + 1} -${this.myDate.getDate()} `;


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
      this.form.patchValue({
        [controlName]: file
      });
      this.form.get(controlName)?.updateValueAndValidity();
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
    if (this.form) {
      console.error(this.form);
      // Check if the form is invalid

      return;
    }
    const formData = new FormData();

    // Append user info to formData
    const userInfo = this.form.get('userInfo')?.value;
    formData.append('name', userInfo.title);
    formData.append('category_id', userInfo.category_id);  // Assuming category is an ID
    formData.append('description', userInfo.description);
    formData.append('price', userInfo.price);
    formData.append('duration', userInfo.duration);
    formData.append('latitude', this.form.value.latitude);
    formData.append('longitude', this.form.value.longitude);
    formData.append('status', userInfo.status);
    formData.append('tag', userInfo.tags);

    // Append image
    const image = this.form.get('userInfo.item_image')?.value;
    if (image) {
      formData.append('item_image', image);
    }

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


  // onSubmit() {
  //   const formData = new FormData();

  //   // Append user info to formData
  //   const userInfo = this.form.get('userInfo')?.value;
  //   formData.append('title', userInfo.firstName);
  //   formData.append('category', userInfo.lastName);
  //   formData.append('description', userInfo.lastName);
  //   formData.append('startDate', userInfo.lastName);
  //   formData.append('endDate', userInfo.lastName);
  //   formData.append('status', userInfo.lastName);
  //   formData.append('tags', userInfo.lastName);

  //   // Append skills to formData
  //   this.skills.controls.forEach((skill, index) => {
  //     formData.append(`skills[${ index }][name]`, skill.get('name')?.value);
  //     formData.append(`skills[${ index }][level]`, skill.get('level')?.value);
  //   });

  //   // Append images to formData
  //   this.images.controls.forEach((imageCtrl, index) => {
  //     const image = imageCtrl.value;
  //     if (image) {
  //       formData.append(`images[${ index }]`, image);
  //     }
  //   });

  //   console.log(this.form.value);  // You can see the form structure here
  //   // Now you can send formData to your server via an HTTP request
  // }
  // Handle image upload
  onImageSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.images.at(index).setValue(file); // Set the image file in the form array
    }

  }

}
