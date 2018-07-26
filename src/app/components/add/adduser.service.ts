import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { SharingService } from '../../services/sharing.service';
@Injectable({
  providedIn: 'root'
})
export class AdduserService {

  latitude:number;
  longitute:number;

  constructor(private http: Http, private datashare: SharingService) { }


    distance :number;
    R :number;

    maxLat :number;
    minLat :number;
    maxLon :number;
    minLon :number;
    // Converts from degrees to radians.
radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
degrees = function(radians) {
  return radians * 180 / Math.PI;
};


  add(user: any) {
    this.datashare.currentlat.subscribe((latitude) => {
    this.latitude=parseFloat(latitude);

})

    this.datashare.currentlon.subscribe((longitute) => {
    this.longitute=parseFloat(longitute);
})


    let url = 'http://127.0.0.1:8000/api/register';
  /*  console.log(this.latitude);
    console.log(this.longitute);*/

this.distance = 31.0686; //your distance in MILE
this.R = 6371; //constant earth radius. You can add precision here if you wish

this.maxLat = this.latitude + this.degrees(this.distance/this.R);
this.minLat = this.latitude - this.degrees(this.distance/this.R);
this.maxLon = this.longitute + this.degrees(Math.asin(this.distance/this.R) / Math.cos(this.radians(this.latitude)));
this.minLon = this.longitute - this.degrees(Math.asin(this.distance/this.R) / Math.cos(this.radians(this.latitude)));



    let body     = new URLSearchParams();
    body.append('Nom', user.name);
    body.append('Prenom', user.lastname);
    body.append('email', user.email);
    body.append('NumTel', user.num);
    body.append('LAT', String(this.latitude));
    body.append('LON', String(this.longitute));
    body.append('MAXLAT', String(this.maxLat));
    body.append('MINLAT', String(this.minLat));
    body.append('MAXLON', String(this.maxLon));
    body.append('MINLON', String(this.minLon));
    body.append('Username', user.username);
    body.append('Password', user.password);
  /*  console.log(user.name);
    console.log(user.lastname);
    console.log(user.email);
    console.log(user.num);
    console.log(String(this.latitude));
    console.log(String(this.longitute));

    console.log(String(this.maxLat));
    console.log(String(this.minLat));
    console.log(String(this.maxLon));
    console.log(String(this.minLon));

    console.log(user.username);
    console.log(user.password);
    */

    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});

    return this.http
            .post(url, body.toString(), options)
          .map((data: Response) => data.json());
  }
}
