import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Company, User } from '../models';

interface authResponse {
  _id: string,
  Email: string,
  FirstName: string,
  Company: Company,
  LastName: string,
  AccessToken: string
}
export class loginDetails {
  public userId: string = '';
  public user?: User = new User;
  public AccessToken: string = '';
  public isLogged: boolean = false;
  public constructor(init?: Partial<loginDetails>) {
    Object.assign(this, init);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser = new BehaviorSubject<loginDetails>({
    user: {
      _id:sessionStorage.getItem('_id') ? sessionStorage.getItem('_id')! : '',
      FirstName:sessionStorage.getItem('FirstName') ? sessionStorage.getItem('FirstName')! : '',
      LastName:sessionStorage.getItem('LastName') ? sessionStorage.getItem('LastName')! : '',
      Email:sessionStorage.getItem('Email') ? sessionStorage.getItem('Email')! : '',
    },
    userId: sessionStorage.getItem('_id') ? sessionStorage.getItem('_id')! : '',
    AccessToken: sessionStorage.getItem('AccessToken') ? sessionStorage.getItem('AccessToken')! : '',
    isLogged: sessionStorage.getItem('AccessToken') ? true : false,
  });
  constructor(private http: HttpClient) { }
  authenticateUser(email: string, password: string): Observable<authResponse> {
    return this.http.post<authResponse>("User/authenticate", { Username: email.toLowerCase(), Password: password });
  }
  async logIn(id?: string, AccessToken: string = ''): Promise<User> {
    let user: User = new User;
    if (id) {
      await this.http.get<User>("User/" + id).subscribe(result => {
        this.loggedUser.next({ userId: id, user: { ...result }, AccessToken: AccessToken, isLogged: true });
        user = result
        sessionStorage.setItem("FirstName",result.FirstName);
        sessionStorage.setItem("LastName",result.LastName);
        sessionStorage.setItem("Email",result.Email);
      }
      );
    }
    return user;
  }
  logOut(): void {
    this.loggedUser.next(new loginDetails);
    sessionStorage.clear();
  }
  public getLoggedUser(): Observable<loginDetails> {
    return this.loggedUser.asObservable();
  }
}
