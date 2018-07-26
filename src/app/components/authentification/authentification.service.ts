import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: Http) { }
  authenticate(user: any) {
    let url     = 'http://127.0.0.1:8000/api/token';
    let body     = new URLSearchParams();
    body.append('Username', user.username);
    body.append('Password', user.password);
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});

    return this.http
            .post(url, body.toString(), options)
          .map((data: Response) => data.json());
  }

  getinfo(user: any) {
    let url     = 'http://127.0.0.1:8000/api/statistics/';
    let body     = new URLSearchParams();
    body.append('Username', user.username);
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});

    return this.http
            .post(url, body.toString(), options)
          .map((data: Response) => data.json());
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired('id_token')
  }
}
