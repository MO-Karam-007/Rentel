import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';



@Component({
  selector: 'app-categories-card',
  standalone: true,
  imports: [FormsModule, NgClass, CommonModule, LoadingComponent],
  templateUrl: './categories-card.component.html',
  styleUrl: './categories-card.component.scss'
})
export class CategoriesCardComponent implements OnInit {
  categories: any[];
  newCategory: any = { id: 0, name: '' };
  editing: boolean = false;
  editingCategory: any = { id: 0, name: '' };
  categoryName: string;
  action = true
  id: number;
  constructor(private categoriesService: CategoriesService) {
  }
  ngOnInit(): void {
    this.allCategory()
  }

  allCategory() {
    this.categoriesService.categories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  addCategory() {
    // const token = localStorage.getItem('token') || '';
    const token = this.categoriesService.getToken();


    if (this.action === true) {
      this.categoriesService.addCategory(this.categoryName, token)
        .subscribe((res: any) => {
          this.allCategory();
          this.categoryName = '';
        }
        );
    } else {

      this.categoriesService.putCategory(this.categoryName, token, this.id)

        .subscribe((res: any) => {
          this.allCategory();
          this.categoryName = '';
          this.action = true

          // this.editingCategory = res.data;
          // this.categoryName = res.data.name;
        });

    }
  }


  update(id: number, category: string) {
    this.categoryName = category;
    this.action = false
    this.id = id

  }
}
