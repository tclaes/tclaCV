import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  show = false;

  constructor(private auth: AuthService) { }

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
