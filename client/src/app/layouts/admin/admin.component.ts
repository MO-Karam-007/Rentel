import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../components/admin/side-bar/side-bar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,SideBarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {


}
