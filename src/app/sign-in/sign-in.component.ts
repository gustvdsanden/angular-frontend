import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';
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
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void { }
  async onSubmit() {
    let { email, password } = this.loginForm.value;
    this.authService
      .authenticateUser(email, password)
      .subscribe((result) => {
        result.FirstName = 'Gust';
        result.LastName = 'van der Sanden';
        for (let item in result) {
          //@ts-ignore
          sessionStorage.setItem(item.toString(), result[item.toString()])
        }
        this.authService.logIn({ ...result ,isLogged:true});
        this.router.navigate(['/feed']);
      });
  }

}
