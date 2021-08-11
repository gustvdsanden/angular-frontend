import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute,private authService:AuthService,private userService:UserService) { }
  myUser:User= new User;
  profileUser:User = new User;
  ngOnInit(): void {
    this.route.queryParams.subscribe(result=>{
      this.userService.getUserFromId(result.userId).subscribe((user)=>{
        this.profileUser=user;
      })
    })
    this.authService.getLogDetails().subscribe((result:any) => {
      if (result.isLogged) {
        this.authService.fetchMyUser(result.userId).subscribe((user:User) => {
          this.myUser = user;
        });
      }
    });
  }
  

}
