import { CookieService } from 'ngx-cookie';
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { customerModel } from "../components/customer/customer.model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  isLoggedin: boolean= false;

  fetchData = new EventEmitter<any[]>();
  fetchCustomer = new EventEmitter<customerModel>();
  jwtToken = new EventEmitter<string>();
  createEntity = new EventEmitter<boolean>();


  private data: any[] = []

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }


  loginUser(credentials: { email: string, password: string }) {

    console.log("cred", credentials);
    this.http.post("http://localhost:3000/users/login", credentials).subscribe((data) => {
      console.log("data", data);
      this.jwtToken.emit((data as any).token);
      this.isLoggedin = true;

      localStorage.setItem('access_token', data.toString());
          return true;

    },(error)=>{
      console.log(error.message)
    })
  }
  getRole() {
    const id = this.cookieService.get("id")
    if( localStorage.getItem('access_token')){
  return this.http.get("http://localhost:3000/roles", {
       headers: { "Authorization": `Bearer ${id}` }
     })
   }
   console.log("id"+id);

   return this,this.http.get(`http://localhost:3000/customer/${id}/users`)
  }
  getCustomer() {
    const id = this.cookieService.get("id")
    if( localStorage.getItem('access_token')){
  return this.http.get("http://localhost:3000/customers"
     , {
       headers: { "Authorization": `Bearer ${id}` }
     })
   }
   console.log("id"+id);

   return this,this.http.get(`http://localhost:3000/customer/${id}/users`)

}
  updateCustomer(data: any, id: number) {
    return this.http.put("http://localhost:3000/customers/" + id, data)
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }
  createCustomer(user: any) {
    return this.http.post<any>("http://localhost:3000/customers", user)
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }

  deleteCustomer(id: number) {
    return this.http.delete("http://localhost:3000/customers/" + id)
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }

  createUser(user: any) {
    return this.http.post<any>("http://localhost:3000/signup", user)
      .pipe(map((userinfo: any) => {
        this.createEntity.emit(true);
        return userinfo;

      }))
  }
  createUser1(user: any) {
    console.log(user);
    return this.http.post<any>("http://[::1]:3000/signup", user).subscribe((data)=>{

      console.log("created user",data);
      this.createEntity.emit(true);
      this.getUser();
    })

  }

  getUser() {
    const id = this.cookieService.get("id")
       if( localStorage.getItem('access_token')){
     return this.http.get("http://[::1]:3000/users?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22firstname%22%3A%20true%2C%0A%20%20%20%20%22middlename%22%3A%20true%2C%0A%20%20%20%20%22lastname%22%3A%20true%2C%0A%20%20%20%20%22email%22%3A%20true%2C%0A%20%20%20%20%22username%22%3A%20true%2C%0A%20%20%20%20%22password%22%3A%20false%2C%0A%20%20%20%20%22phonenumber%22%3A%20true%2C%0A%20%20%20%20%22address%22%3A%20true%2C%0A%20%20%20%20%22roleId%22%3A%20true%2C%0A%20%20%20%20%22customerId%22%3A%20true%2C%0A%20%20%20%20%22created%22%3A%20true%2C%0A%20%20%20%20%22modified%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22include%22%3A%20%5B%0A%20%0A%20%20%5D%0A%7D"
        , {
          headers: { "Authorization": `Bearer ${id}` }
        })
      }
      console.log("id"+id);

      return this,this.http.get(`http://localhost:3000/customer/${id}/users`)

  }

  getCustomerUser(id: number) {
    const id1 = this.cookieService.get("id")
       if( localStorage.getItem('access_token')){
     return this.http.get(`http://localhost:3000/customers/${id}/users?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22firstname%22%3A%20true%2C%0A%20%20%20%20%22middlename%22%3A%20true%2C%0A%20%20%20%20%22lastname%22%3A%20true%2C%0A%20%20%20%20%22email%22%3A%20true%2C%0A%20%20%20%20%22password%22%3A%20false%2C%0A%20%20%20%20%22phonenumber%22%3A%20true%2C%0A%20%20%20%20%22address%22%3A%20true%2C%0A%20%20%20%20%22roleId%22%3A%20true%2C%0A%20%20%20%20%22customerId%22%3A%20true%2C%0A%20%20%20%20%22created%22%3A%20true%2C%0A%20%20%20%20%22modified%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22include%22%3A%20%5B%0A%20%20%20%20%0A%20%20%5D%0A%7D`
        , {
          headers: { "Authorization": `Bearer ${id1}` }
        })
      }
      console.log("id"+id);

      return this,this.http.get(`http://localhost:3000/customer/${id}/users`)

  }

  DeleteCustomerUser(id: number) {
    return this.http.delete(`http://localhost:3000/customers/${id}/users`)
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }



  updateUser(data: any, id: number) {
    console.log(data)
    return this.http.patch("http://localhost:3000/signup/" + id, data)
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }

  deleteUser(id: number) {
    return this.http.delete("http://localhost:3000/users/" + id)
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }


}
