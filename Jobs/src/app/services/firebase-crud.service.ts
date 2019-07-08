import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Job } from '../services/job'
import { Category } from '../services/category'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {

  jobCollectionRef: AngularFirestoreCollection<Job>;
  catCollectionRef: AngularFirestoreCollection<Category>;
  job$: Observable<Job[]>;
  cat$: Observable<Category[]>;

  constructor(
    public afs : AngularFirestore
  ) {
    this.getCategories();
    this.getJobs();
   }

  getCategories(){

    var db = this;
    
    this.catCollectionRef = db.afs.collection<Category>('categories');
    this.cat$ = this.catCollectionRef.snapshotChanges().pipe(map(documents => {

      return documents.map(categories => {
        const catList = categories.payload.doc.data() as Category;
        const id = categories.payload.doc.id;

        return {id, ...catList}
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

        return {id, ...jobsList};
      })
    }))
    
    /* db.afs.collection("jobs").snapshotChanges().subscribe((querySnapshot) => {
      querySnapshot.map((aiuda) => {
        const jobCreated = aiuda.payload.doc.data()
        console.log(jobCreated)
        
      })
    }) */
    
  }

  updateJob(job : Job) {
    this.jobCollectionRef.doc(job.id).update({
      category: job.category,
      company: job.company,
      description: job.description,
      location: job.location,
      position: job.position,
      type: job.type
    })
  }

  deleteJob(job : Job){
    this.jobCollectionRef.doc(job.id).delete();
  }
}
