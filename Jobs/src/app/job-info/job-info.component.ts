import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../services/job';
import { Observable } from 'rxjs';
import { FirebaseCrudService } from '../services/firebase-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css']
})
export class JobInfoComponent implements OnInit {

  job: Job;
  crud : FirebaseCrudService;
  
  constructor(private router : Router, crud : FirebaseCrudService) {
    this.crud = crud;
   }

  ngOnInit() {
    this.getJobId();
  }

  getJobId(){
    this.job = {
      id : localStorage.getItem('jobId'),
      category : localStorage.getItem('jobCat'),
      company : localStorage.getItem('jobCom'),
      location : localStorage.getItem('jobLoc'),
      position : localStorage.getItem('jobPos'),
      description : localStorage.getItem('jobDesc'),
      type: localStorage.getItem('jobType')
    }

    console.log(this.job);
  }

  erase() {
    this.crud.deleteJob(this.job);
    this.router.navigateByUrl('/dashboard');
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
