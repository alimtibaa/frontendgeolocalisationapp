import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  private name = new BehaviorSubject("default name");
  currentname = this.name.asObservable();

  private lastname = new BehaviorSubject("default lastname");
  currentlastname = this.lastname.asObservable();


  private latitude = new BehaviorSubject("default lat");
  currentlat = this.latitude.asObservable();

  private longitute = new BehaviorSubject("default lon");
  currentlon = this.longitute.asObservable();

  constructor() { }

   changelatitude(latitude:number){
     this.latitude.next(String(latitude))
   }

   changelongitute(longitute:number){
     this.longitute.next(String(longitute))
   }

   changename(name:string){
     this.name.next(name)
   }

   changelastname(lastname:string){
     this.lastname.next(lastname)
   }
}
