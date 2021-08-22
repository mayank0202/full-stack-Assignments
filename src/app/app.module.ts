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


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoadComponent,
    CustomerComponent,
    RoleComponent,
    ShowUserCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
