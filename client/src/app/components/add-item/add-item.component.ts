import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { CdkVirtualForOf } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})

export class AddItemComponent implements OnInit {
  itemForm!: FormGroup;
  specForm!: FormGroup;
  imageForm!: FormGroup;
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
  }

  itemsArray: number[];


  ngOnInit() {
    this.initForm();
    this.getLocation();

    this.getCategories();

    // this.form = this.fb.group({
    //   name: ['', Validators.required],
    //   category_id: ['', Validators.required],
    //   description: [''],
    //   price: ['', Validators.required],
    //   latitude: [null, Validators.required],
    //   longitude: [null, Validators.required],
    //   item_image: [null, Validators.nullValidator],
    //   startDate: ['', Validators.required],
    //   endDate: ['', Validators.required],
    //   current_state: ['available', Validators.nullValidator]
    //   // skills: this.fb.array([]),  // Array of skills
    //   // images: this.fb.array([])   // Array of images
    // });
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


  initForm() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category_id: ['', Validators.required],
      price: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      item_image: [null, Validators.nullValidator],
      // status: ['', Validators.nullValidator],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      current_state: ['available', Validators.nullValidator],
      specifications: this.fb.array([]),
      images: this.fb.array([])
    });
  }

  createSpecField() {
    return this.fb.group({
      spec_name: ['', Validators.required],
      spec_value: ['', Validators.required]
    });
  }


  // Method to array specification form
  get specifications() {
    return this.itemForm.get('specifications') as FormArray;
  }

  addSpecification() {
    this.specifications.push(this.createSpecField());
  }

  removeSpecification(index: number) {
    this.specifications.removeAt(index);
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            this.itemForm.patchValue({
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


  getCategories() {
    this.categoriesService.categories().subscribe((data: any) => {
      this.categories = data.data;
    });
  }


  get images(): FormArray {
    return this.itemForm.get('images') as FormArray;
  }

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
      const userInfoForm = this.itemForm;

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
    console.log("Hekki Matata");

    const token = localStorage.getItem('token') || '';
    // 
    console.log('Form Data: ', this.itemForm.value);


    // if (this.itemForm.get('item_image')?.value) {
    //   formData.itemDetails.append('item_image', this.itemForm.get('item_image')?.value);
    // }


    // const item = this.itemForm
    // if (this.itemForm.valid && this.imageForm.valid && this.specForm.valid) {
    // const formData = {
    //   // itemDetails: this.itemForm.value,
    //   // images: this.imageForm.value.additionalImages,
    //   // specifications: this.specForm.value
    // };

    // const speco = formData.specifications.map(specification => {
    // return {
    // spec_name: specification.spec_name,
    // spec_value: specification.spec_value
    // }
    // })
    // console.log('Form Data: ', this.specifications);

    const formData = new FormData();
    // }
    formData.append('name', this.itemForm.get('name')?.value); // Adjust 'itemName' as needed
    formData.append('price', this.itemForm.get('price')?.value);
    // formData.append('status', this.itemForm.get('status')?.value);
    formData.append('category_id', this.itemForm.get('category_id')?.value);
    formData.append('description', this.itemForm.get('description')?.value);
    formData.append('latitude', this.itemForm.get('latitude')?.value);
    formData.append('longitude', this.itemForm.get('longitude')?.value);
    formData.append('startDate', this.itemForm.get('startDate')?.value);
    formData.append('endDate', this.itemForm.get('endDate')?.value);
    formData.append('current_state', this.itemForm.get('current_state')?.value);


    if (this.itemForm.value.item_image) {
      formData.append('item_image', this.itemForm.value.item_image);
    }

    this.specifications.controls.forEach((spec, index) => {
      formData.append(`specifications[${index}][spec_name]`, spec.get('spec_name')?.value);
      formData.append(`specifications[${index}][spec_value]`, spec.get('spec_value')?.value);
    });
    console.log(formData);

    // if (this.itemForm.value.item_image) {
    // formData.append('item_image', this.itemForm.value.item_image);
    // }


    // console.log(formData);


    // this.specifications.controls.forEach((spec, index) => {
    //   formData.specifications.append(`specifications[${index}][spec_name]`, spec.get('spec_name')?.value);
    //   formData.specifications.append(`specifications[${index}][spec_value]`, spec.get('spec_value')?.value);
    // });





    this.itemService.createItem(formData, token).subscribe(
      response => {

        console.log("Inside the method");
        console.log(response);
        console.log('Item added successfully:', response);
      },
      error => {
        console.error('Error adding item:', error);
      }
    );


  }



}


//   // // Append skills to formData
//   // this.skills.controls.forEach((skill, index) => {
//   //   formData.append(`skills[${index}][name]`, skill.get('name')?.value);
//   //   formData.append(`skills[${index}][level]`, skill.get('level')?.value);
//   // });

//   // // Append images to formData
// this.images.controls.forEach((imageCtrl, index) => {
//   const image = imageCtrl.value;
//   if (image) {
//     formData.append(`images[${index}]`, image);
//   }
// });

//   // Submit the form data via HTTP POST request
//   this.itemService.createItem(formData, token).subscribe(
//     response => {

//       console.log("Inside the method");
//       console.log(response);
//       console.log('Item added successfully:', response);
//     },
//     error => {
//       console.error('Error adding item:', error);
//     }
//   );
// }


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


// daysBetween(date1: Date, date2: Date): number {
//   const oneDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
//   const diffInTime = Math.abs(date2.getTime() - date1.getTime());
//   return Math.floor(diffInTime / oneDay);
// }


