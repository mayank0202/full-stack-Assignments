import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadComponent } from './components/load/load.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RoleComponent } from './components/role/role.component';
import { ShowUserCustomerComponent } from './components/show-user-customer/show-user-customer.component';

const routes: Routes = [{ path: "", component: LoadComponent }, { path: "dashboard", component: DashboardComponent },
{ path: "roles", component: RoleComponent }, { path: "customer", component: CustomerComponent },
{ path: "showUserAssociatedWithCustomer/:id", component: ShowUserCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
