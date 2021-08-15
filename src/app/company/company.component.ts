import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companyForm = this.formBuilder.group({
    Name: '',
    Description:'',
    Address:'',
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private companyService: CompanyService,
    private router:Router
    ){}

  ngOnInit(): void {
  }
  onSubmit():void{
    this.companyService.createCompany(this.companyForm.value).subscribe((result)=>{
      this.authService.getNewToken();
      this.router.navigate(['company/profile']);
    });
  }
}
