import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './_guard/index';
import { AuthentificationService } from './components/authentification/authentification.service';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { MapComponent } from './components/map/map.component';
import { AddComponent } from './components/add/add.component';
import {Ng2Webstorage} from 'ngx-webstorage';
import {AdduserService } from './components/add/adduser.service';
import {DetectlocationService } from './components/add/detectlocation.service';
import {SharingService } from './services/sharing.service';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from "@angular/common";
const appRoutes: Routes = [

{path:'', component:AuthentificationComponent},
{path:'Add', component:AddComponent},
{path:'Map', component:MapComponent}
]

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    MapComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2Webstorage,
    HttpClientModule
  ],
  exports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
],
  providers: [
    {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [ Http, RequestOptions ]
    },
    AuthGuard,
    AuthentificationService,
    AdduserService,
    DetectlocationService,
    SharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
