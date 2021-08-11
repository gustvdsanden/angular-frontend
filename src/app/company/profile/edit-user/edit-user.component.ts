import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role, User } from 'src/app/models';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  roles: Role[] = [];
  selectedRole = new Role;
  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.roles = this.data.Roles;
    this.selectedRole = { ...this.data.Roles.find((role: Role) => role.Name == this.data.User.Role.Name) };
  }
  save(): void {
    let user = this.data.User;
    user.Role = this.selectedRole;
    this.dialogRef.close(user);
  }

}
