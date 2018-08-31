import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  show = false;

  constructor(public auth: AuthService, route: ActivatedRoute) {}

  toggleCollapse() {
    this.show = !this.show;
  }

  signOut() {
    this.auth.signOut();
  }


}
