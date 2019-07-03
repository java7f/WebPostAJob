import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userEmail: string;
  constructor(
    router : Router,
    afs : AngularFirestore ) { }

  ngOnInit() {
    
  }

  isLoggedIn(){
    this.userEmail = localStorage.getItem('userEmail');
    return localStorage.getItem('isLoggedIn') == 'true';
  }

  

}
