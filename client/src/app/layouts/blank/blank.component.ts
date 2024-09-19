import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
