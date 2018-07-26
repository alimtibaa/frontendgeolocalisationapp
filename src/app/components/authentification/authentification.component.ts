import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { SharingService } from '../../services/sharing.service';

import { AuthentificationService } from './authentification.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';
  latitude:number;
  longitute:number;
  name:string;
  lastname:string;
  constructor(  private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private router: Router,
    private datashare: SharingService,

  ) { this.loginForm = formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    }); }

  ngOnInit() {
  }
  onSubmit() {

    this.authentificationService
    .getinfo(this.loginForm.value).subscribe( data => {
      this.datashare.changelatitude(data.LAT);
      console.log(data.LAT);
      this.datashare.changelongitute(data.LON);
      console.log(data.LON);

      this.datashare.changename(data.Nom);
      console.log(data.Nom);

      this.datashare.changelastname(data.Prenom);
      console.log(data.Prenom);

      },
      error => this.error = error.message
    );

    this.authentificationService
    .authenticate(this.loginForm.value)
    .subscribe(
      data => {
        localStorage.setItem('id_token', data.token);
        this.router.navigate(['Map']);
      },
      error => this.error = error.message
    );
  }
}
