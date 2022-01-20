import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  userData!:any;
  constructor(private router:Router,private api:ApiService) { }

  ngOnInit(): void {
    this.getRole();
  }
  showDashboard(){
    this.router.navigateByUrl('/dashboard')
  }
  showCustomer(){
   this.router.navigateByUrl('/customer')
 }
 order(a:KeyValue<String,String>,b:KeyValue<String,String>){
  return 0;
}
getRole(){
  this.api.getRole()
    .subscribe((data) => {
    this.userData= data ;
    console.log(this.userData);
    // console.log(this.userdata.userinfo);
  })
}
}
