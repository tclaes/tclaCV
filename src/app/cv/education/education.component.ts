import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

export interface Study {
  id?: string;
  title: string;
  description: string;
  date?: string;
}

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  edit = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
