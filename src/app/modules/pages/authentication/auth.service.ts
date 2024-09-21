import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '@app/modules/pages/authentication/user';
import { ApiService } from '@shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private api: ApiService,) {}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getMe() {
    return of(null);
  }

  login(username: string, password: string) {
    return of(null);
  }

  logout() {
    return of(null);
  }

}
