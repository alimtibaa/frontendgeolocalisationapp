import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './components/authentification/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private authentificationService: AuthentificationService, private router: Router) {

  }

  hasAuthToken() {
    return localStorage.getItem('id_token') !== null;
  }

  logout() {
    this.authentificationService.logout();
    this.router.navigate(['home']);
  }
}
