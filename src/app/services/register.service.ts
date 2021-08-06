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
    return this.http.post<registerResponse>("http://localhost:8080/api/User",{Email: user.email,Password:user.password,FirstName:user.firstname,LastName:user.lastname});
  }
}
