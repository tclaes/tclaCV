import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import * as firebase from 'firebase/app';
import { UploadService } from '../uploads/shared/upload.service';
import { Upload } from '../uploads/shared/upload';
import * as _ from 'lodash';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(public auth: AuthService, public upSvc: UploadService) { }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  async uploadSingle(user) {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload, user);
  }
}
