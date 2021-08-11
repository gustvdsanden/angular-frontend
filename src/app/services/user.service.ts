import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersOfCompany(): Observable<User[]>{
    return this.http.get<User[]>("User/company");
  }
  getUserFromId(userId:string): Observable<User>{
    return this.http.get<User>("User/"+userId);
  }
  editUser(user:User): Observable<User>{
    return this.http.put<User>("User/"+user._id,{Role:user.Role._id});
  }
}
