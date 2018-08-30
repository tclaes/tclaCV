import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Upload } from './upload';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AuthService } from '../../core/auth.service';

@Injectable()
export class UploadService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public auth: AuthService
  ) {}

  private basePath = '/uploads';
  edit = false;

  pushUpload(upload: Upload, user) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        upload.progress =
          (uploadTask.snapshot.bytesTransferred /
            uploadTask.snapshot.totalBytes) *
          100;
      },
      error => {
        console.log('This is wrong: ' , error);
      },
      () => {
      uploadTask.snapshot.ref.getDownloadURL()
          .then( downloadURL => {
            const data = {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: downloadURL,
              email: user.email
            };
            console.log(this.auth.user);
            this.auth.updateUserData(data);
            this.edit = false;
            return downloadURL;
          });
        // this.saveFileData(upload);
      }
    );
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
