import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentDashboardComponent } from "../components/student-dashboard/student-dashboard.component";
import { TopNavBarComponent } from "../components/top-nav-bar/top-nav-bar.component";
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentDashboardComponent, TopNavBarComponent,LoaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-practice-with-api';

  constructor(
    public loaderService : LoaderService
  ) {}
  
}
