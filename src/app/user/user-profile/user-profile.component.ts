import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../uploads/shared/upload.service';
import { Upload } from '../../uploads/shared/upload';
import * as _ from 'lodash';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(public auth: AuthService, public upSvc: UploadService) { }

  uploadSingle(event, user) {
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload, user);
  }

}
