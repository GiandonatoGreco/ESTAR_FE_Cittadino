import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginI } from 'models/profile';
import * as LoginData from '../json/login.json';
import { HttpClient } from '@angular/common/http';
import storage from '../../utils/storage';
import { Router } from '@angular/router';
import { routes } from '../../utils/routes';

export const AuthStorage = 'Auth';
export const SessionExpirationStorage = 'SessionExpiration';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = !!storage.read(AuthStorage);
  useMock = environment.useMock;
  // mocks
  loginMock = LoginData as { data: LoginI };

  constructor(private http: HttpClient, private router: Router) {}

  userIsLogged = () => this.isLogged;

  login = (tempToken: string): Observable<LoginI> => {
    if (this.useMock) {
      return of(this.loginMock.data).pipe(delay(2000));
    }

    const url = ``; //TODO
    return this.http.get<LoginI>(url);
  };

  logout() {
    this.isLogged = false;
    storage.clearAll();
    this.router.navigate([routes.landing.path]);
  }

  refreshToken = (): Observable<LoginI> => {
    if (this.useMock) {
      return of(this.loginMock.data).pipe(delay(100));
    }

    const url = ``; //TODO
    return this.http.get<LoginI>(url);
  };
}
