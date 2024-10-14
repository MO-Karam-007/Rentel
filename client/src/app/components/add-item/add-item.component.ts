import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  createItemForm: FormGroup;
  minDateTime: string;
  previewUrls: string[] = [];  // Store image preview URLs
  categories: string[] = ['sports', 'Books', 'Tech', 'Tools']
  @ViewChild('start') startEl!: ElementRef<any>;
  myDate = new Date();
  min!: string;


  constructor(private fb: FormBuilder) {

    this.createItemForm = this.fb.group({
      userInfo: this.fb.group({
        title: ['', Validators.required],
        category: ['', Validators.required],
        description: [''],
        item_image: [null, Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        status: ['Available', Validators.required],
        tags: ['']
      }),
      skills: this.fb.array([]),  // Array of skills
      images: this.fb.array([])   // Array of images
    });

    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:mm'
  }



  itemsArray: number[];
  ngOnInit(): void {
    if (`${this.myDate.getMonth() + 1}`.length < 2) {
      this.min = `${this.myDate.getFullYear()}-0${this.myDate.getMonth() + 1}-${this.myDate.getDate()}`;
    } else if (`${this.myDate.getDate()}`.length < 2) {
      this.min = `${this.myDate.getFullYear()}-${this.myDate.getMonth() + 1}-0${this.myDate.getDate()}`;
    } else if (`${this.myDate.getMonth() + 1}`.length < 2 && `${this.myDate.getDate()}`.length < 2) {
      this.min = `${this.myDate.getFullYear()}-0${this.myDate.getMonth() + 1}-0${this.myDate.getDate()}`;
    } else {
      this.min = `${this.myDate.getFullYear()}-${this.myDate.getMonth() + 1}-${this.myDate.getDate()}`;


    }
  }


  get skills(): FormArray {
    return this.createItemForm.get('skills') as FormArray;
  }

  get images(): FormArray {
    return this.createItemForm.get('images') as FormArray;
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
      this.createItemForm.patchValue({
        [controlName]: file
      });
      this.createItemForm.get(controlName)?.updateValueAndValidity();
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

    // Append user info to formData
    const userInfo = this.createItemForm.get('userInfo')?.value;
    formData.append('title', userInfo.firstName);
    formData.append('category', userInfo.lastName);
    formData.append('description', userInfo.lastName);
    formData.append('startDate', userInfo.lastName);
    formData.append('endDate', userInfo.lastName);
    formData.append('status', userInfo.lastName);
    formData.append('tags', userInfo.lastName);

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

    console.log(this.createItemForm.value);  // You can see the form structure here
    // Now you can send formData to your server via an HTTP request
  }
  // Handle image upload
  onImageSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.images.at(index).setValue(file); // Set the image file in the form array
    }
  }






}
