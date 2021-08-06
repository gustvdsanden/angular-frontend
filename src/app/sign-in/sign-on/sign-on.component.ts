import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.scss']
})
export class SignOnComponent implements OnInit {
  registerForm = this.formBuilder.group({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService, private router: Router
  ) { }

  ngOnInit(): void {
  }
  async onSubmit() {
    console.log(this.registerForm.value);
    let user = this.registerForm.value;
    this.registerService.createUser(user).subscribe(result => { console.log(result); });
    this.router.navigate(['/sign-in']);
  }

}
