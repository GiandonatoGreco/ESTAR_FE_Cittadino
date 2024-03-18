import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  AuthStorage,
  SessionExpirationStorage,
} from 'auth/auth.service';
import { NotificationPosition } from 'design-angular-kit';
import storage from '../utils/storage';
import { timestampToDate } from '../utils/dates';
import dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ESTAR - Cittadino';
  notificationPosition = NotificationPosition.Top;

  constructor(private authService: AuthService) {}

  refreshToken = () =>
    this.authService.refreshToken().subscribe({
      next: (data) => {
        storage.write(AuthStorage, data.token);
        storage.write(
          SessionExpirationStorage,
          data.expiration_date.toString()
        );
        this.authService.isLogged = true;
        // set another timeout
        this.checkRefreshToken(60 * 60); // 60 min
      },
      error: (error) => {
        console.error('Error on token refresh:', error?.message);
      },
    });

  checkRefreshToken(timeout?: number) {
    const deltaMins = 10 * 60; // 10 min
    const expirationDate = storage.read(SessionExpirationStorage)?.value;
    if (!expirationDate) {
      // if !expirationdate --> is first login: set new refresh in 1h
      setTimeout(() => {
        this.refreshToken();
      }, (3600 - deltaMins) * 1000);
    } else {
      const timeToExpiration = timeout || expirationDate - dayjs().unix();

      if (timeToExpiration > deltaMins) {
        // refresh token deltaMins before expiration
        setTimeout(() => {
          this.refreshToken();
        }, (timeToExpiration - deltaMins) * 1000);
      } else if (timeToExpiration > 0) {
        // refresh token immediately
        this.refreshToken();
      } else {
        // token is expired --> new login needed
        this.authService.logout();
      }
    }
  }

  ngOnInit(): void {
    this.checkRefreshToken();
  }
}
