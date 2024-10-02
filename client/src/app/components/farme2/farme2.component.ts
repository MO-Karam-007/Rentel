import { CurrencyPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA,Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-farme2',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './farme2.component.html',
  styleUrl: './farme2.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class Farme2Component{

}
