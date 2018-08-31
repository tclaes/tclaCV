import { Injectable } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../user/user';

@Injectable()
export class AuthService {

  user: Observable<User>;
  authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.authState = afAuth.authState;
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
      return this.authState !== null;
  }

  get currentUser() {
    return this.authenticated ? this.authState : null;
  }

      // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.authState = credential;
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.authState = credential.user;
      this.updateUserData(credential.user);
    });
  }

  updateUserData(user: User) {
    // Sets data to firestore on login

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );


    const data = {
      uid: user.uid,
      email: user.email,
      address: user.address,
      phone: user.phone,
      displayName: user.displayName,
      photoURL: user.photoURL
    };


    return userRef.update(data);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
    private handleError(error: Error) {
      console.error(error);
    }
}




