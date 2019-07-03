import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '../services/user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData: User

  constructor(
    public auth: AuthService,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router) { }

  ngOnInit() {
  }

  /**
   * Uses de AuthService to register the user
   */
  registerUser(name, lastName, email, password) {

    var db = this

    this.userData = {
      name: name,
      lastName: lastName,
      email: email,
      userType: {
        administrator: true,
        poster: false,
        user: false
      }
    }

    this.afAuth.auth.createUserWithEmailAndPassword(this.userData.email, password)
    .then(() => {
      db.afs.collection("users").add({
        name: this.userData.name,
        lastName: this.userData.lastName,
        email: this.userData.email,
        userType: this.userData.userType
      })

      this.router.navigateByUrl('/dashboard')
    })
      .catch(function (e) {
        window.alert(e.message)
      })
    console.log(this.userData.name + this.userData.lastName)
  }
}
