import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getRole() {
    return this.http.get("http://localhost:3000/roles")
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }
  getCustomer() {
    return this.http.get("http://localhost:3000/customers")
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
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
    return this.http.post<any>("http://localhost:3000/users", user)
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }
  getUser() {
    return this.http.get("http://localhost:3000/users")
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }

  getCustomerUser(id: number) {
    return this.http.get(`http://localhost:3000/customers/${id}/users`)
      .pipe(map((userinfo: any) => {
        return userinfo;
      }))
  }



  updateUser(data: any, id: number) {
    return this.http.put("http://localhost:3000/users/" + id, data)
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
