import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createUser(user:any){
    return this.http.post<any>("http://localhost:8080/users",user)
    .pipe(map((userinfo:any)=>{
      return userinfo;
    }))
  }
  getUser(){
    return this.http.get("http://localhost:8080/users")
    .pipe(map((userinfo:any)=>{
      return userinfo;
    }))
  }
  updateUser(data:any,id:number){
    return this.http.put("http://localhost:8080/users/"+id,data)
    .pipe(map((userinfo:any)=>{
      return userinfo;
    }))
  }

  deleteUser(id:number){
    return this.http.delete("http://localhost:8080/users/"+id)
    .pipe(map((userinfo:any)=>{
      return userinfo;
    }))
  }
}
