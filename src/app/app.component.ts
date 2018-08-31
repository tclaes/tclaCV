import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private auth: AuthService, private router: Router) {
    this.router.navigate(['/home']);
  }
}

