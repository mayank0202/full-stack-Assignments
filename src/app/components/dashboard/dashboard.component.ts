import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { userModel } from './dashboard.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  userData!:any;
  userModel: userModel=new userModel();
  showAdd!:boolean;
  showUpdate!:boolean;


  constructor(private formbuilder:FormBuilder,private api:ApiService,private router:Router) { }
  formValue= this.formbuilder.group({
    id:[''],
    firstname:[''],
    middlename:[''],
    lastname:[''],
    email:[''],
    username:[''],
    password:[''],
    phonenumber:[''],
    address:[''],
    roleId:[''],
    customerId:[''],

  })
  ngOnInit(): void {

    this.getData();
  }
  getData(){
    this.api.getUser()
      .subscribe((user) => {
      this.userData= user ;
      console.log(this.userData);

      // console.log(this.userdata.userinfo);
    })
  }
  createData(){
    this.userModel.id = this.formValue.value.id;
    this.userModel.firstname = this.formValue.value.firstname;
    this.userModel.middlename = this.formValue.value.middlename;
    this.userModel.lastname = this.formValue.value.lastname;
    this.userModel.email = this.formValue.value.email;
    this.userModel.username = this.formValue.value.username;
    this.userModel.password = this.formValue.value.password;
    this.userModel.phonenumber = this.formValue.value.phonenumber;
    this.userModel.address = this.formValue.value.address;
    this.userModel.roleId=this.formValue.value.roleId;
    this.userModel.customerId=this.formValue.value.customerId;


    this.api.createUser(this.userModel)
    .subscribe(res=>{
      console.log(res);
      alert("Data saved successfully");
      let closeform = document.getElementById('cancel')
      closeform?.click();
      this.formValue.reset();
      this.getData();

    },err=>{
      alert("something went wrong"+err);

    })

  }

  deleteData(row:any){
    this.api.deleteUser(row.id)
    .subscribe(res=>{
      alert("employee data deleted")
      console.log(res);
      this.getData();


    })

  }

  editData(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.userModel.id = row.id;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['middlename'].setValue(row.middlename);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['username'].setValue(row.username);
    this.formValue.controls['password'].setValue(row.password);
    this.formValue.controls['phonenumber'].setValue(row.phonenumber);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['roleId'].setValue(row.roleId);
    this.formValue.controls['customerId'].setValue(row.customerId);
  }
  updateData(){
    this.userModel.firstname = this.formValue.value.firstname;
    this.userModel.middlename = this.formValue.value.middlename;
    this.userModel.lastname = this.formValue.value.lastname;
    this.userModel.email = this.formValue.value.email;
    this.userModel.username = this.formValue.value.username;
    this.userModel.password=this.formValue.value.password;
    this.userModel.phonenumber = this.formValue.value.phonenumber;
    this.userModel.address = this.formValue.value.address;
    this.userModel.roleId = this.formValue.value.roleId;
    this.userModel.customerId = this.formValue.value.customerId;
    this.api.updateUser(this.userModel,this.userModel.id)
    .subscribe(res=>{
      alert("data saved successfully");
      console.log(res);
      let closeform = document.getElementById('cancel')
      closeform?.click();
      this.formValue.reset();
      this.getData();

    })

  }

  clickAdduser(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  order(a:KeyValue<String,String>,b:KeyValue<String,String>){
    return 0;
  }
  showRole() {
    this.router.navigateByUrl('/roles');
};
showCustomer() {
  this.router.navigateByUrl('/customer');
};
logout() {
  localStorage.removeItem('access_token');
  this.router.navigateByUrl('')

}

}
