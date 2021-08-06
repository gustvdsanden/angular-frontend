import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

interface authResponse {
  _id:string,
  Email:string,
  FirstName: string,
  LastName:string,
  AccessToken: string
}
type loginDetails ={
  _id:string,
  FirstName:string,
  LastName:string,
  AccessToken:string,
  Email:string,
  isLogged: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser = new BehaviorSubject({_id:sessionStorage.getItem('_id')? sessionStorage.getItem('_id')!:'',FirstName:sessionStorage.getItem('FirstName')? sessionStorage.getItem('FirstName')!:'',LastName:sessionStorage.getItem('LastName')? sessionStorage.getItem('LastName')!:'',AccessToken:sessionStorage.getItem('AccessToken')? sessionStorage.getItem('AccessToken')!:'',Email:sessionStorage.getItem('Email')? sessionStorage.getItem('Email')!:'',isLogged:sessionStorage.getItem('AccessToken')? true:false});
  constructor(private http: HttpClient) { }

  authenticateUser(email: string, password: string): Observable<authResponse> {
    return this.http.post<authResponse>("http://localhost:8080/api/User/authenticate", { Email: email, Password: password });
  }
  logIn(user: any): void {
    this.loggedUser.next({...user});
  }
  logOut():void{
    this.loggedUser.next({_id:'',Email:'',FirstName:'',AccessToken:'',isLogged:false,LastName:''});
    sessionStorage.clear();
  }
  public getLoggedUser():Observable<loginDetails>{
    return this.loggedUser.asObservable();
  }
}
