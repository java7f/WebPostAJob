import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';

import { FirebaseApp } from '@angular/fire';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../services/user';
import { FirebaseCrudService } from '../services/firebase-crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<User>;
  crud: FirebaseCrudService;

  constructor(
    public auth : AuthService,
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    crud: FirebaseCrudService) { 
      this.crud = crud;
    }

  ngOnInit() {
  }

  // Sign in with email/password
  signIn(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user)=>{
      localStorage.setItem('userEmail',email);
      localStorage.setItem('isLoggedIn', 'true');
      this.crud.registerUserType(user.user.uid);
      this.router.navigateByUrl('/dashboard');
    })
    .catch(function (e) {
      window.alert(e.message);
    })

    console.log(localStorage.getItem('userType'));
  }

}
