import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  categories: string[] = ['sports', 'Books', 'Tech', 'Tools']
  @ViewChild('start') startEl!: ElementRef<any>;
  myDate = new Date();
  min!: string;

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

  showelement() { }
}


// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-add-item',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   template: `
//     <form [formGroup]="form" (ngSubmit)="onSubmit()">
//       <div>
//         <label for="name">Name:</label>
//         <input id="name" type="text" formControlName="name">
//       </div>
//       <div>
//         <label for="age">Age:</label>
//         <input id="age" type="number" formControlName="age">
//       </div>
//       <div formArrayName="images">
//         <div *ngFor="let image of images.controls; let i = index" class="image-upload">
//           <input type="file" (change)="onFileChange($event, i)" accept="image/*">
//           <img *ngIf="image.value" [src]="image.value" alt="Preview" class="preview">
//         </div>
//       </div>
//       <button type="button" (click)="addImageField()" [disabled]="images.length >= 6">Add Image</button>
//       <button type="submit">Submit</button>
//     </form>
//     <div class="image-grid">
//       <div *ngFor="let image of images.controls" class="image-item">
//         <img *ngIf="image.value" [src]="image.value" alt="Uploaded image">
//       </div>
//     </div>
//   `,
//   styles: [`
//     .image-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       grid-template-rows: repeat(3, 1fr);
//       gap: 10px;
//       margin-top: 20px;
//     }
//     .image-item {
//       width: 100%;
//       height: 200px;
//       overflow: hidden;
//     }
//     .image-item img {
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//     }
//     .preview {
//       max-width: 100px;
//       max-height: 100px;
//       margin-top: 10px;
//     }
//   `]
// })
// export class AddItemComponent implements OnInit {
//   form!: FormGroup;

//   constructor(private fb: FormBuilder) { }

//   ngOnInit() {
//     this.form = this.fb.group({
//       name: ['', Validators.required],
//       age: ['', [Validators.required, Validators.min(0)]],
//       images: this.fb.array([])
//     });
//     this.addImageField(); // Add the first image field
//   }

//   get images() {
//     return this.form.get('images') as FormArray;
//   }

//   addImageField() {
//     if (this.images.length < 6) {
//       this.images.push(this.fb.control(''));
//     }
//   }

//   onFileChange(event: any, index: number) {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.images.at(index).setValue(e.target.result);
//         if (index === this.images.length - 1 && this.images.length < 6) {
//           this.addImageField();
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       console.log(this.form.value);
//       // Here you would typically send the form data to a server
//     } else {
//       console.log('Form is invalid');
//     }
//   }
// }