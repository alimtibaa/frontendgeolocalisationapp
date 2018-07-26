import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharingService } from '../../services/sharing.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import * as L from 'leaflet';
@Component({
  selector: 'app-Map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude:number;
  longitute:number;
  name:string;
  lastname:string;

    constructor(private http: HttpClient,private datashare:SharingService){
    }
  // Fonction d'initialisation du composant.
  ngOnInit() {
  this.datashare.currentname.subscribe((name) => {

   //console.log(latitude);
   this.name=name;

  })

  this.datashare.currentlastname.subscribe((lastname) => {

   //console.log(latitude);
   this.lastname=lastname;

  })


this.datashare.currentlat.subscribe((latitude) => {

 //console.log(latitude);
 this.latitude=parseFloat(latitude);

})

this.datashare.currentlon.subscribe((longitute) => {

 //console.log(longitute);
 this.longitute=parseFloat(longitute);

})

    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([this.latitude,this.longitute], 15);
    var influence = L.circle([this.latitude,this.longitute], 600).addTo(myfrugalmap);
   const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    L.marker([this.latitude, this.longitute], {icon: myIcon}).bindPopup('Je suis un Marqueur').addTo(myfrugalmap).openPopup();

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);


  }
  }
