import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';

import { FirebaseApp } from '@angular/fire';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public auth : AuthService,
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router) { }

  ngOnInit() {
  }

  // Sign in with email/password
  signIn(email, password) {
   // this.router.navigateByUrl('')
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(()=>{
       localStorage.setItem('userEmail',email);
       localStorage.setItem('isLoggedIn', 'true');
        console.log('AIUDAA');
        this.router.navigateByUrl('/dashboard');
    })
    .catch(function (e) {

      window.alert(e.message);
    })
  }

}
