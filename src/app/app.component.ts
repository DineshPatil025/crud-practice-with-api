import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentDashboardComponent } from "../components/student-dashboard/student-dashboard.component";
import { TopNavBarComponent } from "../components/top-nav-bar/top-nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentDashboardComponent, TopNavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-practice-with-api';
}
