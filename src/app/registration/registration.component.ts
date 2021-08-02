import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  async onSubmit() {
    console.log(this.loginForm.value);
    let {email, password} = this.loginForm.value;
    this.authService
      .authenticateUser(email,password)
      .subscribe((result) => {
        console.log(result)
        localStorage.setItem("token",result.AccessToken);
        localStorage.setItem("email",result.Email);
      } );
  }
}
