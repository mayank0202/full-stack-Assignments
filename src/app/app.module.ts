import { ApiService } from 'src/app/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadComponent } from './components/load/load.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RoleComponent } from './components/role/role.component';
import { ShowUserCustomerComponent } from './components/show-user-customer/show-user-customer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CookieModule } from 'ngx-cookie';
import { JwtModule } from '@auth0/angular-jwt';

import { CanActivate, Router } from '@angular/router';
import {AlwaysAuthGuard} from './app-routing.module'

// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoadComponent,
    CustomerComponent,
    RoleComponent,
    ShowUserCustomerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    CookieModule.forRoot(),


  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
