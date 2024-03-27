import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'auth/auth.service';
import { routes } from '../../../utils/routes';
import { timestampToDate } from '../../../utils/dates';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  isMobile = false;
  isLogged: boolean = false;
  name = 'Gloria Rossi';
  routes = routes;

  links = [
    {
      label: routes.dashboard.title,
      url: `${routes.dashboard.path}`,
    },
    {
      label: routes.homepage.title,
      url: `${routes.homepage.path}`,
    },
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
  ];

  isActive(url: string): boolean {
    const currentLocation = window.location.href;

    if (url === '') {
      return currentLocation === '';
    }
    return currentLocation?.includes(url);
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const header = document.querySelector('.it-header-wrapper');
    if (!header) return;

    const boundingClientRect = header?.getBoundingClientRect();
    const offsetTop = boundingClientRect.top;

    if (boundingClientRect.height + boundingClientRect.top < 0) {
      document.querySelector('.header-sticky-wrapper')?.classList.add('sticky');
    } else {
      document
        .querySelector('.header-sticky-wrapper')
        ?.classList.remove('sticky');
    }
  }

  // dropdown notifications
  notifications: { date: string; text: string }[] = [
    {
      date: timestampToDate(1710414016),
      text: 'Hai ricevuto un nuovo documento dal tuo medico',
    },
    {
      date: timestampToDate(1710214016),
      text: 'Hai ricevuto un nuovo documento dal tuo medico',
    },
  ];

  // dropdown contacts
  contactItems = [
    {
      link: 'mailto:help.cse@regione.toscana.it',
      text: 'help.cse@regione.toscana.it',
      icon: 'envelope',
    },
    {
      link: 'tel:800 004 477',
      text: '800 004 477',
      icon: 'phone',
    },
    {
      link: undefined,
      text: 'Lun-Ven: 9:00-19:00, Sab: 9:00-13:00',
      icon: 'calendar-days',
    },
  ];

  // dropdown profile
  logout() {
    this.authService.logout();
    this.router.navigate(['/', routes.landing.path]);
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  ngAfterViewInit(): void {
    // add event listners to sidebar links to hide sidebar on click
    const mobileLinks = document.querySelectorAll(
      '.navbar-collapsable .nav-link'
    );
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (this.isMobile) {
          (document.querySelector('.btn.close-menu') as HTMLElement)?.click();
        }
      });
    });

    // hide header dorpdowns on scroll
    const dropdowns = document.querySelectorAll('header .dropdown-menu');
    document.addEventListener('scroll', () => {
      dropdowns.forEach((d) => d.classList.remove('show'));
    });
  }

  openMobileMenu() {
    // toggle mobile sidebar in custom sticky header
    (document.querySelector('.custom-navbar-toggler') as HTMLElement)?.click();
  }
}
