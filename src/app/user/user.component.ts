import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UploadService } from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import * as _ from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(public auth: AuthService, public upSvc: UploadService) { }

}
