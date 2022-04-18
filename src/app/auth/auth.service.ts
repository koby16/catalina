import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
    ) {
    this.userData = afAuth.authState;
  }

  SignUp(email: string, password: string) {
    this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('You are Successfully signed up!', res);
      this.router.navigate(['auth/login'])
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
      this.router.navigate(['devices/dashboard-devices'])
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
