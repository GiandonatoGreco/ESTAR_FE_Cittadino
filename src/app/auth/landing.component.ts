import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthService,
  AuthStorage,
  SessionExpirationStorage,
} from 'auth/auth.service';
import storage from '../../utils/storage';
import { routes } from '../../utils/routes';
import { ItNotificationService } from 'design-angular-kit';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  queryParams!: {
    [key: string]: any;
  };
  title = 'Attendi';
  subtitle = 'Stai per essere reindirizzato...';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly notificationService: ItNotificationService
  ) {}

  onError() {
    this.title = 'Attenzione!';
    this.subtitle = 'Qualcosa è andato storto.';
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParams;

    if (this.queryParams?.['token']) {
      this.authService.login(this.queryParams['token']).subscribe({
        next: (data) => {
          storage.write(AuthStorage, data.token);
          storage.write(
            SessionExpirationStorage,
            data.expiration_date.toString()
          );
          this.authService.isLogged = true;
        },
        error: (error) => {
          this.notificationService.error('Notifica Errore', error?.message);
          this.onError();
        },
        complete: () => {
          this.router.navigate([routes.dashboard.path]);
        },
      });
    } else {
      this.onError();
    }
  }
}
