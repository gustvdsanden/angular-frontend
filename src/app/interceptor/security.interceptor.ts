import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  constructor(private _router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url:  environment.apiUrl + request.url
  });

    let token = sessionStorage.getItem('AccessToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          "x-access-token": token,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this._router.navigate(['security']);
        }
        return throwError('unauthorized');
      })
    );
  }
}
