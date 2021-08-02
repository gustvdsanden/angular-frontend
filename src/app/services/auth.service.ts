import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

interface authResponse{
  Email:string,
  AccessToken:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticateUser(email:string, password:string): Observable<authResponse>{
    return this.http.post<authResponse>("http://localhost:8080/api/User/authenticate",{Email: email,Password:password});
  }
}
