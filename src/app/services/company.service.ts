import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  createCompany(company:Company): Observable<Company>{
    return this.http.post<Company>("Company/",company);
    
  }
}
