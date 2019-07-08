import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseApp } from '@angular/fire'

import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  firebaseUser: any; // Firebase user instance

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public fireApp: FirebaseApp,
    public router: Router,
  ) {}
    
  // Sign in with email/password
  signIn(email, password) {

    var db = this
    

    this.firebaseUser = this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(function(error){
      var errorMessage = error.message;
      window.alert(errorMessage.message)
    }).then(res => db.router.navigate(['/dashboard']))

  }

  signUp(user, password) {
    var db = this

    this.firebaseUser = this.afAuth.auth.createUserWithEmailAndPassword(user.email, password)
    .catch(function (e) {
      window.alert(e.message)
    })
    .then(function () {
      console.log(user.name + user.lastName)

      db.afs.collection("users").add({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType
      }).then(res => db.router.navigate(['/dashboard']))
    })
  }

  // Sign out 
  signOut() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }
}
