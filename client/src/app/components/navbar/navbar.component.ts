import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // @Input() bg: string = 'bg-black';
  token!: string | null
  // private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  ngOnInit(): void {

    // if (isPlatformBrowser(this._PLATFORM_ID)) {
    // this.token = localStorage.getItem('userToken')
  }


}
