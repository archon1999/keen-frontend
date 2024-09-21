import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';
import { User } from '@app/modules/pages/authentication/user';
import { ApiService } from '@shared/services/api.service';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthService {
  protected _http = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private api: ApiService) {}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getMe() {
    return this.api.get('me').pipe(
      tap((user: User) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.currentUserSubject.next(null);
        }
      }),
      catchError(err => of(null))
    );
  }

  login(username: string, password: string) {
    const token = btoa(`${username}:${password}`);
    const headers = { 'Authorization': `Basic ${token}` };
    return this._http
      .post<any>(`${environment.apiUrl}/api/login/`, {}, { headers: headers })
      .pipe(tap(user => this.currentUserSubject.next(user)));
  }

  logout() {
    return of(null);
  }

}
