import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../uploads/shared/upload.service';
import { Upload } from '../../uploads/shared/upload';
import * as _ from 'lodash';
import { AuthService } from '../../core/auth.service';
import { log } from 'util';
import { User } from '../user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  selectedFiles: FileList;
  currentUpload: Upload;
  user;
  address = '';
  displayName = '';
  phone = '';
  email = '';

  constructor(public auth: AuthService, public upSvc: UploadService, private af: AngularFireDatabase) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.displayName = this.user.displayName;
        this.address = this.user.address || '';
        this.phone = this.user.phone || '';
        this.email = this.user.email;
      }

    });
  }

  updateUserData() {

    this.displayName !== null ? this.user.displayName = this.displayName : this.displayName = '';
    this.address !== null ? this.user.address = this.address : this.address = '';
    this.phone !== null ? this.user.phone = this.phone : this.phone = '';
    this.email !== null ? this.user.email = this.email : this.email = '';

    this.auth.updateUserData(this.user);
    this.upSvc.edit = false;
  }

  uploadSingle(event, user) {
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    const URL = this.upSvc.pushUpload(this.currentUpload, user);
  }
}
