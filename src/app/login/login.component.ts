import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  faGoogle = faGoogle;

  constructor(public auth: AuthService) { }

}
