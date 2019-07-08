import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostjobComponent } from './postjob/postjob.component';
import { JobInfoComponent } from './job-info/job-info.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component'
import { SearchResultComponent } from './search-result/search-result.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { CategoryModelComponent } from './category-model/category-model.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'postjob', component: PostjobComponent },
  { path: 'jobinfo', component: JobInfoComponent },
  { path: 'alljobs', component: AllJobsComponent },
  { path: 'searchResult', component: SearchResultComponent },
  { path: 'updatejob', component: UpdateJobComponent},
  { path: 'newcat', component: CategoryModelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
