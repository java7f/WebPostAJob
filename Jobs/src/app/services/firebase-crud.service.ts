import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Job } from '../services/job'
import { Category } from '../services/category'
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {

  jobCollectionRef: AngularFirestoreCollection<Job>;
  catCollectionRef: AngularFirestoreCollection<Category>;
  userCollectionRef: AngularFirestoreCollection<User>;
  job$: Observable<Job[]>;
  cat$: Observable<Category[]>;
  user$: Observable<User[]>;
  newUser: User;

  constructor(
    public afs: AngularFirestore
  ) {
    this.getCategories();
    this.getJobs();
    this.newUser = <User>{};
  }

  getCategories() {

    var db = this;

    this.catCollectionRef = db.afs.collection<Category>('categories');
    this.cat$ = this.catCollectionRef.snapshotChanges().pipe(map(documents => {

      return documents.map(categories => {
        const catList = categories.payload.doc.data() as Category;
        const id = categories.payload.doc.id;

        return { id, ...catList }
      })
    }))

  }

  getJobs() {

    var db = this;

    this.jobCollectionRef = db.afs.collection<Job>('jobs');
    this.job$ = this.jobCollectionRef.snapshotChanges().pipe(map(documents => {

      return documents.map(jobs => {
        const jobsList = jobs.payload.doc.data() as Job;
        const id = jobs.payload.doc.id;

        return { id, ...jobsList };
      })
    }))

  }

  updateJob(job: Job) {
    this.jobCollectionRef.doc(job.id).update({
      category: job.category,
      company: job.company,
      description: job.description,
      location: job.location,
      position: job.position,
      type: job.type
    })
  }

  deleteJob(job: Job) {
    this.jobCollectionRef.doc(job.id).delete();
  }

  registerUserType(id: string) {
    console.log(id);

    this.userCollectionRef = this.afs.collection<User>('users');
    this.userCollectionRef.snapshotChanges().pipe(map(userDoc => {
      return userDoc.map(user => {
        const result = user.payload.doc.data() as User;
        const idExtracted = user.payload.doc.id;
        console.log(result.userType)
        if (id === idExtracted)
          localStorage.setItem('userType', result.userType);
          console.log(result.userType)
      })
    }))
  }
}
