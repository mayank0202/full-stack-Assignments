import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { customerModel } from "./customer.model";
@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  customerData!: any;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private user: ActivatedRoute
  ) {}
  formValue = this.formbuilder.group({
    id: [""],
    name: [""],
    website: [""],
    address: [""],
  });
  customerModel: customerModel = new customerModel();
  showAdd!: boolean;
  showUpdate!: boolean;

  ngOnInit(): void {
    this.getCustomer();
  }
  showDashboard() {
    this.router.navigateByUrl("/dashboard");
  }
  showRole() {
    this.router.navigateByUrl("/roles");
  }
  order(a: KeyValue<String, String>, b: KeyValue<String, String>) {
    return 0;
  }
  getCustomer() {
    this.api.getCustomer().subscribe((data) => {
      this.customerData = data;
      console.log(this.customerData);
      // console.log(this.userdata.userinfo);
    });
  }
  createCustomer() {
    this.customerModel.id = this.formValue.value.id;
    this.customerModel.name = this.formValue.value.name;
    this.customerModel.website = this.formValue.value.website;
    this.customerModel.address = this.formValue.value.address;
    this.api.createCustomer(this.customerModel).subscribe(
      (res) => {
        console.log(res);
        alert("Data saved successfully");
        let closeform = document.getElementById("cancel");
        closeform?.click();
        this.formValue.reset();
        this.getCustomer();
      },
      (err) => {
        alert("something went wrong" + err);
      }
    );
  }
  editData(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.customerModel.id = row.id;
    this.formValue.controls["id"].setValue(row.id);
    this.formValue.controls["name"].setValue(row.name);
    this.formValue.controls["website"].setValue(row.website);
    this.formValue.controls["address"].setValue(row.address);
  }

  updateCustomer() {
    this.customerModel.name = this.formValue.value.name;
    this.customerModel.website = this.formValue.value.website;
    this.customerModel.address = this.formValue.value.address;
    this.api
      .updateCustomer(this.customerModel, this.customerModel.id)
      .subscribe((res) => {
        alert("data saved successfully");
        console.log(res);
        let closeform = document.getElementById("cancel");
        closeform?.click();
        this.formValue.reset();
        this.getCustomer();
      });
  }

  deleteCustomer(row: any) {
    this.api.deleteCustomer(row.id).subscribe((res) => {
      alert("customer data deleted");
      console.log(res);
      this.getCustomer();
    });
  }
  clickAddCustomer() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  // showUser(){
  //   this.router.navigateByUrl(`/showUserAssociatedWithCustomer`);
  // }
}
