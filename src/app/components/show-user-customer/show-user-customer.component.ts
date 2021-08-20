import { userModel } from '../dashboard/dashboard.model';
import { customerModel } from '../customer/customer.model';
import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-show-user-customer',
  templateUrl: './show-user-customer.component.html',
  styleUrls: ['./show-user-customer.component.css']
})
export class ShowUserCustomerComponent implements OnInit {
  userData!: any;
  userModel: userModel = new userModel();
  customerModel: customerModel = new customerModel();
  id!: any;
  isdata!: boolean;
  constructor(private router: Router, private api: ApiService, private user: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.user.snapshot.paramMap.get("id")
    console.log(this.id);
    this.getData(this.id);
  }
  showCustomer() {
    this.router.navigateByUrl('/customer')
  }
  order(a: KeyValue<String, String>, b: KeyValue<String, String>) {
    return 0;
  }
  getData(id: number) {
    this.api.getCustomerUser(id)
      .subscribe((data) => {
        this.userData = data;
        if (this.userData[0] == null) {
          // alert("Unknown data");
          this.isdata = true;

        }
        console.log(this.userData[0]);
        // console.log(this.userdata.userinfo);
      })
  }

}

