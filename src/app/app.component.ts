import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
type loginDetails ={
  Id:string,
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
  user:loginDetails={Id:'',FirstName:'',Email:'',AccessToken:'',isLogged:false};
  login =this.authService.getLoggedUser().subscribe((result) =>{this.user= {...result, isLogged:true}});
  token=sessionStorage.getItem("token");
  ngOnInit():void{

  }
  logOut():void{
    console.log('test');
    this.authService.logOut();
    this.router.navigate(['/sign-in']);
  }
}
