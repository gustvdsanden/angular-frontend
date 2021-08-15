import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute,private authService:AuthService,private userService:UserService, public dialog: MatDialog) { }
  myUser:User= new User;
  profileUser:User = new User;
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(){
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
  openEditDialog(): void {

    const editDialog = this.dialog.open(EditComponent, {
      width: '65vw',
      data: { User: this.myUser }
    });

    editDialog.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.userService.editUser(result).subscribe(() => {
          this.fetchUsers();
        })
      }
    });
  }
  

}
