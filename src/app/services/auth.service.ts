import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Company, User } from '../models';

interface authResponse {
  _id: string,
  CompanyId: string,
  AccessToken: string
}
export class loginDetails {
  public userId: string = '';
  public CompanyId: string = '';
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
  logDetails = new BehaviorSubject<loginDetails>({
    userId: sessionStorage.getItem('_id') ? sessionStorage.getItem('_id')! : '',
    AccessToken: sessionStorage.getItem('AccessToken') ? sessionStorage.getItem('AccessToken')! : '',
    CompanyId: sessionStorage.getItem('CompanyId') ? sessionStorage.getItem('CompanyId')! : '',
    isLogged: sessionStorage.getItem('AccessToken') ? true : false,
  });
  loggedUser = new BehaviorSubject<User>(new User);
  constructor(private http: HttpClient) { }
  async authenticateUser(email: string, password: string): Promise<void> {
    this.http.post<authResponse>("User/authenticate", { Username: email.toLowerCase(), Password: password }).subscribe((authResponse: authResponse) => {
      for (let item in authResponse) {
        //@ts-ignore
        sessionStorage.setItem(item.toString(), authResponse[item.toString()])
      }
      this.logDetails.next({ userId:authResponse._id,AccessToken:authResponse.AccessToken,CompanyId:authResponse.CompanyId, isLogged: true })
      if (authResponse.AccessToken) {
        this.fetchMyUser(authResponse._id).subscribe(result => {
          this.loggedUser.next(result);
        })
      }
    });
  }
  fetchMyUser(userId: string = this.logDetails.getValue().userId): Observable<User> {
    return this.http.get<User>("User/" + userId);
  }
  logOut(): void {
    this.logDetails.next(new loginDetails);
    this.loggedUser.next(new User);
    sessionStorage.clear();
  }
  public getLogDetails(): Observable<loginDetails> {
    return this.logDetails.asObservable();
  }
  public getLoggedUser(): Observable<User> {
    return this.loggedUser.asObservable();
  }
}
