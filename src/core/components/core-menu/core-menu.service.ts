import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { AuthService } from '@app/modules/pages/authentication/auth.service';
import { User } from '@app/modules/pages/authentication/user';

@Injectable({
  providedIn: 'root'
})
export class CoreMenuService {
  currentUser: User;
  onItemCollapsed: Subject<any>;
  onItemCollapseToggled: Subject<any>;

  private _onMenuRegistered: BehaviorSubject<any>;
  private _onMenuUnregistered: BehaviorSubject<any>;
  private _onMenuChanged: BehaviorSubject<any>;
  private _currentMenuKey: string;
  private _registry: { [key: string]: any } = {};

  constructor(private _router: Router, private _authenticationService: AuthService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));

    this.onItemCollapsed = new Subject();
    this.onItemCollapseToggled = new Subject();

    this._currentMenuKey = null;
    this._onMenuRegistered = new BehaviorSubject(null);
    this._onMenuUnregistered = new BehaviorSubject(null);
    this._onMenuChanged = new BehaviorSubject(null);
  }

  get onMenuRegistered(): Observable<any> {
    return this._onMenuRegistered.asObservable();
  }

  get onMenuUnregistered(): Observable<any> {
    return this._onMenuUnregistered.asObservable();
  }

  get onMenuChanged(): Observable<any> {
    return this._onMenuChanged.asObservable();
  }

  register(key: string, menu: any): void {
    if (this._registry[key]) {
      console.error(`Menu with the key '${key}' already exists. Either unregister it first or use a unique key.`);
      return;
    }

    this._registry[key] = menu;
    this._onMenuRegistered.next([key, menu]);
  }

  unregister(key: string): void {
    if (!this._registry[key]) {
      console.warn(`Menu with the key '${key}' doesn't exist in the registry.`);
    }

    delete this._registry[key];
    this._onMenuUnregistered.next(key);
  }

  getMenu(key: string): any {
    if (!this._registry[key]) {
      console.warn(`Menu with the key '${key}' doesn't exist in the registry.`);
      return;
    }

    return this._registry[key];
  }

  getCurrentMenu(): any {
    if (!this._currentMenuKey) {
      console.warn(`The current menu is not set.`);
      return;
    }

    return this.getMenu(this._currentMenuKey);
  }

  setCurrentMenu(key: string): void {
    if (!this._registry[key]) {
      console.warn(`Menu with the key '${key}' doesn't exist in the registry.`);
      return;
    }

    this._currentMenuKey = key;
    this._onMenuChanged.next(key);
  }
}
