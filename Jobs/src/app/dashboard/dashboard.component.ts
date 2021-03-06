import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Job } from '../services/job'
import { Category } from '../services/category'
import { Observable } from 'rxjs';

import { FirebaseCrudService } from '../services/firebase-crud.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {

  job$: Observable<Job[]>;
  cat$: Observable<Category[]>; 
  crud : FirebaseCrudService;
  jobsToShow: Job[];

  constructor(
    private router : Router,
    public afs : AngularFirestore,
    crud : FirebaseCrudService) { 
      this.crud = crud;
      this.jobsToShow = [];
     }

  ngOnInit() {
    this.crud.getJobs();
    this.crud.getCategories();
    this.job$ = this.crud.job$;
    this.cat$ = this.crud.cat$;

    this.job$.subscribe((list) => {
      this.jobsToShow = list;
    })
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

  registerSearch(words : string){
    localStorage.setItem('search', words);
    this.router.navigateByUrl('/searchResult')
  }

  registerCategory(cat:string){
    localStorage.setItem('cat', cat);
  }

  getCategoryList(cat:string): Job[] {
    return this.jobsToShow.filter(job => job.category === cat);
  }

}
