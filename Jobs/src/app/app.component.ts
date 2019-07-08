import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCrudService } from './services/firebase-crud.service';
import { User } from './services/user';
import { AuthService } from './services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jobs';

  userId : string;
  userEmail: string;
  crud : FirebaseCrudService;
  user : User;

  constructor(private router : Router, crud : FirebaseCrudService,
    public auth : AuthService,
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth,) {
    this.crud = crud;
    
  }

  isLoggedIn(){
    this.userEmail = localStorage.getItem('userEmail');
    return localStorage.getItem('isLoggedIn') == 'true';
  }

  logOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
}
