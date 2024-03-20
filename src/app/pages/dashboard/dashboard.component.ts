import { Component } from '@angular/core';
import { ItNotificationService } from 'design-angular-kit';
import { DoctorI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import { LoadingService } from 'services/loading.service';
import { routes as utilsRoutes } from '../../../utils/routes';
import { FaqService } from 'services/faq.service';
import { FaqI } from 'models/faq';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  routes = utilsRoutes;
  name = 'Gloria';
  gender: 'm' | 'f' = 'f';
  clinics = [
    {
      "address": "Via Giuseppe Garibaldi, 30 - Pisa",
      "availability": "Lun: 9:00 - 13:00"
    },
    {
      "address": "Via Giuseppe Garibaldi, 30 - Pisa",
      "availability": "Lun: 9:00 - 13:00"
    },
    {
      "address": "Via Giuseppe Garibaldi, 30 - Pisa",
      "availability": "Lun: 9:00 - 13:00"
    },
    {
      "address": "Via Giuseppe Garibaldi, 30 - Pisa",
      "availability": "Lun: 9:00 - 13:00"
    }
  ];

  currentDoctor: DoctorI = {
    id: 0,
    name: '',
    role: '',
    username: '',
    email: '',
    available: 'yes',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: 0,
        lng: 0,
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  };

  faqList: FaqI[] = [];

  isMobile: boolean = false;

  constructor(
    public doctorService: DoctorsService,
    private loadingService: LoadingService,
    private readonly notificationService: ItNotificationService,
    private faqService: FaqService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.doctorService.getDoctorDetails(2).subscribe({
      next: (data) => {
        this.currentDoctor = data;
      }, // nextHandler
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.error('Notifica Errore', error?.message);
        this.loadingService.hideLoading();
      }, // errorHandler
      complete: () => {
        this.loadingService.hideLoading();
      }, // completeHandler
    });
    // get Faq list
    this.faqService.getFaqList(3).subscribe({
      next: (data) => {
        this.faqList = data;
      }, // nextHandler
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.error('Notifica Errore', error?.message);
        this.loadingService.hideLoading();
      }, // errorHandler
      complete: () => {
        this.loadingService.hideLoading();
      }, // completeHandler
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  showAllCards: boolean = false;

  toggleShowAllCards(): void {
    this.showAllCards = !this.showAllCards;
  }
}
