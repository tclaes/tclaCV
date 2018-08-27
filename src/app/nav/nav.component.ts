import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  show = false;

  constructor(public auth: AuthService, route: ActivatedRoute) {

   }

  ngOnInit() {
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  // signInUser(email: string, password: string) {

  // }

  signOut() {
    this.auth.signOut();
  }


}
