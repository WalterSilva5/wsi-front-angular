import { Component, OnInit, isDevMode } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DataService } from './modules/data-service/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    NavbarComponent,
    LoginComponent,
    RouterModule,
  ],
})
export class AppComponent implements OnInit {
  title = 'wsi NLP';
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
