
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data =
    {
      id: "",
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      phonenumber: "",
      address: "",
      roleId: 1,
      customerId: 1

    }

  id!: number;
  error:boolean = false;
  created:boolean = false;

  constructor(private dataService:ApiService,private router:Router) { }

  register(){

    console.log("data",this.data);
    for(var key in this.data){
      if(!(this.data as any)[key]){
        this.error = true;
        console.log("fill all values",key)
        return;
      }
    }

    console.log("ready to submit",this.data)
    this.dataService.createUser1(this.data);
    this.error = false;
    this.created = true;
  }

  ngOnInit(): void {
    this.dataService.createEntity.subscribe(e=>{
      this.router.navigate([""])
    })
  }
  clickLogin(){
    this.router.navigateByUrl("");
  }
}
