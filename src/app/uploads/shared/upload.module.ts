import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from './upload.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  imports: [
    AngularFireDatabaseModule
  ],
  providers: [UploadService]
})
export class UploadModule { }
