import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { AdduserService } from './adduser.service';
import { DetectlocationService } from './detectlocation.service';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  latitude:number;
  longitute:number;
  addForm: FormGroup;
  error: string = '';
  constructor(private formBuilder: FormBuilder,
    private adduser: AdduserService,
    private detectloc: DetectlocationService,
    private datashare: SharingService,
    private router: Router
  ) {
    this.addForm = formBuilder.group({
        'name': ['', Validators.required],
        'lastname': ['', Validators.required],
        'email': ['', Validators.required],
        'num': ['', Validators.required],
        'username': ['', Validators.required],
        'password': ['', Validators.required]
      });
  }
  ngOnInit() {

this.detectloc.getConfig().subscribe((position) => {
   this.datashare.changelatitude(position.lat);
   this.datashare.changelongitute(position.lon);
    },
    error => console.error('Oops:', error.message)
  );

  }
    onSubmit() {
      this.adduser
      .add(this.addForm.value)
      .subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => console.error('Oops:', error.message)
      );

    }

}
