import { Component, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { Company, Role, User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditComponent } from './edit/edit.component';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService:AuthService,private roleService:RoleService,private companyService: CompanyService, private userService: UserService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['Name', 'Role','Edit'];
  company: Company = new Company;
  users: Partial<User>[] = [];
  roles: Role[] = [];
  user:User = new User;
  ngOnInit(): void {
    this.companyService.getMyCompany().subscribe((company) => {
      this.company = company;
    })
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
    })
    this.getUsers();
    this.authService.getLogDetails().subscribe((result:any) => {
      if (result.isLogged) {
        this.authService.fetchMyUser(result.userId).subscribe((user:User) => {
          this.user = user;
        });
      }
    });
  }
  getUsers():void{
    this.userService.getUsersOfCompany().subscribe((users) => {
      this.users = users.map((user) => {
        return { _id:user._id, Name: user.FirstName + " " + user.LastName, Role: user.Role }
      });
    })
  }
  openCompanyDialog(): void {
    const editDialog = this.dialog.open(EditComponent, {
      width: '65vw',
      data: { ...this.company }
    });

    editDialog.afterClosed().subscribe(result => {
      if (result != undefined && this.company != result) {
        this.companyService.editCompany(result).subscribe((result) => {

          this.company = result;
        })
      }
    });
  }
  openUserDialog(userId:string): void {

    const editDialog = this.dialog.open(EditUserComponent, {
      width: '65vw',
      data: { User: this.users.find((user)=> user._id==userId),Roles:this.roles }
    });

    editDialog.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.userService.editUser(result).subscribe(() => {
          this.getUsers()
        })
      }
    });
  }

}
