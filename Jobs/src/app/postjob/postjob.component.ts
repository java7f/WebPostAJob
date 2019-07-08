import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Category } from '../services/category'
import { Observable } from 'rxjs';
import { FirebaseCrudService } from '../services/firebase-crud.service'


@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {

  crud : FirebaseCrudService;
  cat$: Observable<Category[]>;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    crud: FirebaseCrudService) {
      this.crud = crud;
     }

  ngOnInit() {
    this.crud.getCategories();
    this.cat$ = this.crud.cat$;
  }

  registerJob(category, type, company, position, location, description) {

    var db = this

    db.afs.collection("jobs").add({
      category: category,
      type: type,
      company: company,
      position: position,
      location: location,
      description: description
    }).then((docRef) =>{
      console.log("Document written with ID: ", docRef.id);
      this.router.navigateByUrl('/dashboard');
    }).catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
}
