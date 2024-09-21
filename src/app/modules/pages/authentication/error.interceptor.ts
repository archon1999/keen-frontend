import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from "@app/modules/pages/authentication/auth.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _authenticationService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          this._router.navigate(['/pages/miscellaneous/not-authorized']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
