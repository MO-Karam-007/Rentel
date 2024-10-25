import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {

  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
  ];

  users = [
    { id: 1, name: 'John Doe', banned: false },
    { id: 2, name: 'Jane Smith', banned: true },
  ];

  posts = [
    { id: 1, title: 'How to Learn Angular' },
    { id: 2, title: 'Tailwind CSS Basics' },
  ];

  items = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Smartphone' },
  ];

  rentals = [
    { id: 101, user: 'John Doe' },
    { id: 102, user: 'Jane Smith' },
  ];

  ngOnInit(): void { }


  showUsers() {

  }

  deletePost(id) {
  }
  banUser(id) {

  }
  createCategory() {
  }
  deleteCategory(id) {
  }
  deleteItem(id) {
  }
}
