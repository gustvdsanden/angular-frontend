import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Company, User } from '../models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})

export class SignInComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });
  loggedUser = this.authService.getLoggedUser().subscribe();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void { }
  onSubmit() {
    let { email, password } = this.loginForm.value;
    this.authService.authenticateUser(email, password).then(() => {
      this.authService.getLogDetails().subscribe(result => {
        if (result.isLogged) {
          this.authService.fetchMyUser().subscribe((user) => {
            if (user.Company) {
              this.router.navigate(['/feed']);
            } else {
              this.router.navigate(['/company']);
            }
          });
        }

      });
    });

  }

}
