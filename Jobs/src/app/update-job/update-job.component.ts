import { Component, OnInit } from '@angular/core';
import { Job } from '../services/job';
import { FirebaseCrudService } from '../services/firebase-crud.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../services/category';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit {

  job: Job;
  crud : FirebaseCrudService;
  cat$: Observable<Category[]>;

  constructor(private router : Router, crud : FirebaseCrudService) {
    this.crud = crud;
   }

  ngOnInit() {
    this.getJobId();
    this.crud.getCategories();
    this.cat$ = this.crud.cat$;
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
  }

  updateJob(category :  string, type : string, company : string, position : string, location : string, description : string) {
      this.job.category = category;
      this.job.type = type;

      if(company !== '')
        this.job.company = company;

      if(position !== '')
        this.job.position = position;

      if(location !== '')
        this.job.location = location;
      
      if(description !== '')
        this.job.description = description;

      this.crud.updateJob(this.job);
  }

}
