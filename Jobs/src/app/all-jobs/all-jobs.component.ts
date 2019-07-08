import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Job } from '../services/job'
import { Category } from '../services/category'
import { Observable } from 'rxjs';

import { FirebaseCrudService } from '../services/firebase-crud.service'

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css']
})
export class AllJobsComponent implements OnInit {

  category : string;
  job$: Observable<Job[]>;
  cat$: Observable<Category[]>; 
  crud : FirebaseCrudService;

  constructor(
    public afs : AngularFirestore,
    crud : FirebaseCrudService
  ) {
    this.crud = crud;
   }

  ngOnInit() {
    this.crud.getJobs();
    this.crud.getCategories();
    this.job$ = this.crud.job$;
    this.cat$ = this.crud.cat$;
    this.getCategory();
  }

  getCategory() {
    this.category = localStorage.getItem('cat');
  }

  registerJob(job : Job){
    console.log(job);
    
    localStorage.setItem('jobId', job.id);
    localStorage.setItem('jobCat', job.category);
    localStorage.setItem('jobCom', job.company);
    localStorage.setItem('jobDesc', job.description);
    localStorage.setItem('jobLoc', job.location);
    localStorage.setItem('jobPos', job.position);
    localStorage.setItem('jobType', job.type);
  }

}
