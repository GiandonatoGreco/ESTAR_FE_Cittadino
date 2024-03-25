import { Component } from '@angular/core';
import { ItNotificationService } from 'design-angular-kit';
import { DoctorI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import { routes as utilsRoutes } from '../../../utils/routes';
import { FaqService } from 'services/faq.service';
import { FaqI } from 'models/faq';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DocumentsService } from 'services/documents.service';
import { DocumentI } from 'models/documents';

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
      address: 'Via Giuseppe Garibaldi, 30 - Pisa',
      availability: 'Lun: 9:00 - 13:00',
    },
    {
      address: 'Via Giuseppe Garibaldi, 30 - Pisa',
      availability: 'Lun: 9:00 - 13:00',
    },
    {
      address: 'Via Giuseppe Garibaldi, 30 - Pisa',
      availability: 'Lun: 9:00 - 13:00',
    },
    {
      address: 'Via Giuseppe Garibaldi, 30 - Pisa',
      availability: 'Lun: 9:00 - 13:00',
    },
  ];

  currentDoctor!: DoctorI;
  lastDocument!: DocumentI;
  faqList: FaqI[] = [];

  isMobile: boolean = false;

  constructor(
    private readonly notificationService: ItNotificationService,
    private doctorService: DoctorsService,
    private documentsService: DocumentsService,
    private faqService: FaqService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // getDoctorDetails
    this.doctorService.getDoctorDetails(2).subscribe({
      next: (data) => {
        this.currentDoctor = data;
      }, // nextHandler
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.error('Notifica Errore', error?.message);
      }, // errorHandler
    });
    // getDoctorDetails
    this.documentsService.getDocumentsList().subscribe({
      next: ({ data }) => {
        this.lastDocument = data.received[0];
      }, // nextHandler
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.error('Notifica Errore', error?.message);
      }, // errorHandler
    });
    // get Faq list
    this.faqService.getFaqList(3).subscribe({
      next: (data) => {
        this.faqList = data;
      }, // nextHandler
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.error('Notifica Errore', error?.message);
      }, // errorHandler
    });
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  showAllCards: boolean = false;

  toggleShowAllCards(): void {
    this.showAllCards = !this.showAllCards;
  }
}
