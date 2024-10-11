import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  createItemForm: FormGroup;
  minDateTime: string;
  categories: string[] = ['sports', 'Books', 'Tech', 'Tools']
  @ViewChild('start') startEl!: ElementRef<any>;
  myDate = new Date();
  min!: string;


  constructor(private fb: FormBuilder) {
    this.createItemForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      images: this.fb.array([]), // Array for image uploads
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['Available', Validators.required],
      tags: ['']
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

  get images(): FormArray {
    return this.createItemForm.get('images') as FormArray;
  }

  addImage(): void {
    this.images.push(this.fb.control('')); // Add a new control for image file
  }

  removeImage(index: number): void {
    this.images.removeAt(index); // Remove image control at the specified index
  }

  onSubmit(): void {
    if (this.createItemForm.valid) {
      console.log('Form Submitted', this.createItemForm.value);
      // Handle form submission, e.g., send the form data to the server
    } else {
      console.log('Form is not valid');
    }
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