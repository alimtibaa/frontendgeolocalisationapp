import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthentificationService } from '../components/authentification/authentification.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authentification: AuthentificationService, private router: Router) {}

    canActivate() {
        if(this.authentification.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['home']);

            return false;
        }
    }
}
