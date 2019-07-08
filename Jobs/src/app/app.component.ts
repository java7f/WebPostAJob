import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jobs';

  userEmail: string;

  isLoggedIn(){
    this.userEmail = localStorage.getItem('userEmail');
    return localStorage.getItem('isLoggedIn') == 'true';
  }
}
