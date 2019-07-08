import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Job } from '../services/job'
import { Category } from '../services/category'
import { Observable } from 'rxjs';
import { FirebaseCrudService } from '../services/firebase-crud.service'
import { JobInfoComponent } from '../job-info/job-info.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  search : string;
  job$: Observable<Job[]>;
  crud : FirebaseCrudService;
  jobsToShow : Job[];

  constructor(public afs : AngularFirestore,
    crud : FirebaseCrudService) {
      this.crud = crud;
      this.jobsToShow = [];
     }

  ngOnInit() {
    this.getSearch();
    this.crud.getJobs();
    this.crud.getCategories();
    this.job$ = this.crud.job$;

    this.job$.subscribe((list) => {
      this.jobsToShow = list;
    })
  }

  getSearch() {
    this.search = localStorage.getItem('search');
    localStorage.removeItem('search');
    console.log(this.search);
  }

  getSearchResult(): Job[] {

    let jobSearch : Job[] = [];
    let key = this.search.toLowerCase();

    this.jobsToShow.forEach((job) => {

      if(job.category.toLowerCase().includes(key) || job.location.toLowerCase().includes(key) || 
          job.position.toLowerCase().includes(key) || job.company.toLowerCase().includes(key)) {

            jobSearch.push(job);
      }
    })

    return jobSearch;
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
