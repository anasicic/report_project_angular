import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
  constructor() {}

  navigateToAdd(category: string): void {
    console.log(`Navigating to add ${category}`);
  }
}
