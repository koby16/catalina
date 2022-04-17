import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth) {
    this.userData = afAuth.authState;
    console.log(this.userData)
  }

  SignUp(email: string, password: string) {
    this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
    console.log('You are Successfully signed up!', res);
    })
    .catch(error => {
    console.log('Something is wrong:', error.message);
    });
  }

  SignIn(email: string, password: string) {
    this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log("You are in");
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
    });
  }
    
  /* Sign out */
  SignOut() {
    this.afAuth
    .signOut();
  }

}
