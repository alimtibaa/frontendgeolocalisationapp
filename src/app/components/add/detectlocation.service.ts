import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class DetectlocationService {


  constructor(private http: Http) { }

  getConfig() {
    let configUrl = 'http://ip-api.com/json';

    return this.http.get(configUrl).map(res => res.json());
  }
}
