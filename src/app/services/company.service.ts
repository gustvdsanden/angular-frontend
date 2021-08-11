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
  getMyCompany():Observable<Company>{
    return this.http.get<Company>("Company/mine");
  }
  editCompany(company:Company):Observable<Company>{
    return this.http.put<Company>("Company/"+company._id,company);
  }
}
