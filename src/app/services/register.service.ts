import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface registerResponse{
  id:string,
  firstname:string,
  lastname:string,
  email:string
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  createUser(user:any): Observable<registerResponse>{
    return this.http.post<registerResponse>("User",{Email: user.email.toLowerCase(),Password:user.password,FirstName:user.firstname,LastName:user.lastname});
  }
}
