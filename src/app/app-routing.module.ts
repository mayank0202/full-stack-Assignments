
import { ApiService } from './services/api.service';
import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes ,CanActivate} from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadComponent } from './components/load/load.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RoleComponent } from './components/role/role.component';
import { ShowUserCustomerComponent } from './components/show-user-customer/show-user-customer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [{path:"",component:LoginComponent},{path:"register",component:RegisterComponent},{path:"load",component:LoadComponent},{path:"dashboard",component:DashboardComponent},
{path:"roles",component:RoleComponent},{path:"customer",component:CustomerComponent},
{path:"showUserAssociatedWithCustomer/:id",component:ShowUserCustomerComponent}


 export class AlwaysAuthGuard implements CanActivate{
  canActivate(){
    console.log("Always Guard is Provided")
    return true
  }
}
@Injectable()
export class OnlyLoggedinGuardUsers implements CanActivate{
constructor(private userservice:ApiService){}

  canActivate(){
    console.log(" OnlyLoggedinUsers")
    if(this.userservice.isLoggedin){
      return true;
    }else{
      window.alert("you dont have permission to view this page")
      return false;
    }
  }
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
