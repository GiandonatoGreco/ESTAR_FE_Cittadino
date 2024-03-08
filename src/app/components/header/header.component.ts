import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'auth/auth.service';
import { routes } from '../../../utils/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  isLogged: boolean = false;

  links = [
    {
      label: routes.dashboard.title,
      url: `${routes.dashboard.path}`,
    },
    {
      label: routes.homepage.title,
      url: `${routes.homepage.path}`,
    },
  ];

  checkAuthStatus(status: boolean) {
    this.isLogged = status;
    if (status)
      this.links.push(
        ...[
          {
            label: routes.doctors.title,
            url: `${routes.doctors.path}`,
          },
          {
            label: routes.documents.title,
            url: `${routes.documents.path}`,
          },
          {
            label: routes.faq.title,
            url: `${routes.faq.path}`,
          },
        ]
      );
  }

  ngOnInit(): void {
    this.checkAuthStatus(this.authService.userIsLogged());
    this.authService.getLoggedStatus.subscribe((status) =>
      this.checkAuthStatus(status)
    );
  }

  isActive(url: string): boolean {
    const currentLocation = window.location.href;

    if (url === '') {
      return currentLocation === '';
    }
    return currentLocation?.includes(url);
  }

  onClickLogin(): void {
    this.router.navigate(['auth']);
  }

  logout() {
    this.authService.logout();
    this.onClickLogin();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const header = document.querySelector('.it-header-wrapper');
    if (!header) return;

    const boundingClientRect = header?.getBoundingClientRect();
    const offsetTop = boundingClientRect.top;

    if ((boundingClientRect.height + boundingClientRect.top) < 0) {
      document.querySelector('.header-sticky-wrapper')?.classList.add('sticky');
    } else {
      document.querySelector('.header-sticky-wrapper')?.classList.remove('sticky');
    }
  }
}
