import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//Services
import { AuthService } from './services/auth.service';
import { PostjobComponent } from './postjob/postjob.component';
import { JobInfoComponent } from './job-info/job-info.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PostjobComponent,
    JobInfoComponent,
    SearchResultComponent,
    AllJobsComponent,
  ],
  imports: [
    BrowserModule,
    //NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
