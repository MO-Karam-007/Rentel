import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent{
  token!:string | null 
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  ngOnInit(): void {

    if(isPlatformBrowser(this._PLATFORM_ID)) {
      this.token = localStorage.getItem('userToken')
    }


}
}