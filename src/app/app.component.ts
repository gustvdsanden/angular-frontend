import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models';
import { AuthService } from './services/auth.service';
import { loginDetails } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  title = 'angular-exam';
  user: User = new User;
  loginDetails: loginDetails = new loginDetails;
  getLoggin():void{
    this.authService.getLogDetails().subscribe((result) => {
      this.loginDetails = { ...result };
      if (result.isLogged) {
        this.authService.fetchMyUser(result.userId).subscribe((user) => {
          this.user = user;
        });
      }
    });
  }
  
  token = sessionStorage.getItem("token");
  ngOnInit(): void {
    this.getLoggin()
  }
  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/sign-in']);
  }
  logoClick(): void {
    this.getLoggin()
    if (this.loginDetails.isLogged) {
      if (this.user.Company) this.router.navigate(['/feed']);
      else this.router.navigate(['/company']);
    } else {
      this.router.navigate([''])
    }
  }
  navToProfile():void{
    this.router.navigate(['/user/profile'],{queryParams:{userId:this.loginDetails.userId}})
  }
}
