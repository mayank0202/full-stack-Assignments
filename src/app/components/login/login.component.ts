import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email:"",
    password:""
  }
  constructor(private dataService:ApiService,private cookieService:CookieService,private router:Router) { }

  ngOnInit(): void {
    this.dataService.jwtToken.subscribe(t=>{
      console.log("token",t);
      this.cookieService.put("id",t);
      this.router.navigate(["/dashboard"]);
    })
  }

  async onSubmit(){
    this.dataService.loginUser(this.credentials)
  }

  clickRegister(){
    this.router.navigateByUrl("/register");
  }
}
