console.log('');import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [FooterComponent, NavbarComponent,RouterOutlet],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
