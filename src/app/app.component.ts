import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
type loginDetails ={
  _id:string,
  FirstName:string,
  AccessToken:string,
  Email:string,
  isLogged: boolean,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private authService:AuthService, private router:Router){}
  title = 'angular-exam';
  user:loginDetails={_id:'',FirstName:'',Email:'',AccessToken:'',isLogged:false};
  login =this.authService.getLoggedUser().subscribe((result) =>{this.user= {...result}});
  token=sessionStorage.getItem("token");
  ngOnInit():void{

  }
  logOut():void{
    this.authService.logOut();
    this.router.navigate(['/sign-in']);
  }
}
